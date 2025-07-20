import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { ShoppingCartIcon as ShoppingCart, HeartIcon as Heart, ArrowLeftIcon as ArrowLeft, ShieldCheckIcon as ShieldCheck, TruckIcon as Truck, ClockIcon as Clock } from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading: loading, isError, message: error } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      toast.success(`${product.title.substring(0, 20)}... added to cart!`);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link to="/products" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  // Format price with currency symbol
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-indigo-600">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to="/products" className="text-gray-500 hover:text-indigo-600">Products</Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-indigo-600">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900 font-medium">{product.title.substring(0, 20)}...</span>
      </nav>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
            <div className="relative h-80 w-full">
              <img 
                src={product.image} 
                alt={product.title} 
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
              {product.category}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(product.rating?.rate || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
              <p className="mt-1 text-sm text-green-600">Free shipping</p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 text-base text-gray-700 space-y-4">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="mt-1 flex rounded-md">
                <button
                  type="button"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-l-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-center border-gray-300 rounded-none sm:text-sm border-y"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => toast.info('Added to wishlist!')}
                className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Secure Payment</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Fast Delivery</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">24/7 Customer Support</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3" />
                  </svg>
                  <span className="text-sm text-gray-700">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section - This would be implemented with actual related products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* This would be populated with actual related products */}
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="h-40 flex items-center justify-center">
              <p className="text-gray-500">Related products would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;