import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProducts, setViewType, setFilters, resetFilters } from '../redux/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import ProductListItem from '../components/products/ProductListItem';
import { Squares2X2Icon as ViewGrid, Bars4Icon as ViewList, FunnelIcon as Filter, XMarkIcon } from '@heroicons/react/24/outline';

const ProductList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products, filteredProducts, isLoading, viewType, filters } = useSelector((state) => state.products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let category = searchParams.get('category');
    if (category) {
      category = normalizeCategory(category);
      setLocalFilters(prev => ({ ...prev, category }));
      dispatch(setFilters({ category }));
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Helper to normalize category for comparison
  const normalizeCategory = (cat) => {
    if (!cat) return '';
    if (cat.toLowerCase() === 'jewelry') return 'jewelery';
    return cat.toLowerCase();
  };

  // Get all unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];
  // Map 'jewelery' to 'Jewelry' for display
  const displayCategory = (cat) => cat === 'jewelery' ? 'Jewelry' : cat.charAt(0).toUpperCase() + cat.slice(1);

  // Toggle view type between grid and list
  const toggleViewType = (type) => {
    dispatch(setViewType(type));
  };

  // Apply filters
  const applyFilters = () => {
    dispatch(setFilters({ ...localFilters, priceRange }));
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    dispatch(resetFilters());
    setLocalFilters({
      category: 'all',
      priceRange: [0, 1000],
      rating: 0,
      searchQuery: '',
    });
    setPriceRange([0, 1000]);
  };

  // Get min and max price from products
  const minPrice = Math.min(...products.map(product => product.price), 0);
  const maxPrice = Math.max(...products.map(product => product.price), 1000);

  useEffect(() => {
    // Debug: Log all product categories and current filter
    if (products.length > 0) {
      console.log('All product categories:', products.map(p => p.category));
      console.log('Current filter category:', localFilters.category);
    }
  }, [products.length, localFilters.category]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Toolbar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleViewType('grid')}
            className={`p-2 rounded ${viewType === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
            aria-label="Grid view"
          >
            <ViewGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => toggleViewType('list')}
            className={`p-2 rounded ${viewType === 'list' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
            aria-label="List view"
          >
            <ViewList className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center">
          <span className="text-gray-600 mr-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </span>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={handleResetFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={normalizeCategory(localFilters.category) === normalizeCategory(category)}
                      onChange={() => setLocalFilters({ ...localFilters, category: normalizeCategory(category) })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {displayCategory(category)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">${priceRange[0].toFixed(2)}</span>
                  <span className="text-sm text-gray-600">${priceRange[1].toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Rating</h3>
              <div className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={localFilters.rating === rating}
                      onChange={() => setLocalFilters({ ...localFilters, rating })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 flex items-center">
                      {rating === 0 ? (
                        'All Ratings'
                      ) : (
                        <>
                          {[...Array(rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-4 w-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1">& Up</span>
                        </>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={applyFilters}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Filters Sidebar - Mobile */}
        {isFilterOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
            <div className="w-80 bg-white h-full overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={normalizeCategory(localFilters.category) === normalizeCategory(category)}
                        onChange={() => setLocalFilters({ ...localFilters, category: normalizeCategory(category) })}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {displayCategory(category)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">${priceRange[0].toFixed(2)}</span>
                    <span className="text-sm text-gray-600">${priceRange[1].toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Rating</h3>
                <div className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={localFilters.rating === rating}
                        onChange={() => setLocalFilters({ ...localFilters, rating })}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        {rating === 0 ? (
                          'All Ratings'
                        ) : (
                          <>
                            {[...Array(rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="h-4 w-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1">& Up</span>
                          </>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
              <button
                onClick={handleResetFilters}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : viewType === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;