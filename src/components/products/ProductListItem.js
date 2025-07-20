import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { ShoppingCartIcon as ShoppingCart, HeartIcon as Heart } from '@heroicons/react/24/outline';

const ProductListItem = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.title.substring(0, 20)}... added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      toast.info('Removed from wishlist!');
    } else {
      dispatch(addToWishlist(product));
      toast.info('Added to wishlist!');
    }
  };

  // Function to format price with currency symbol
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/4 p-4 flex items-center justify-center">
          <Link to={`/products/${product.id}`} className="block relative h-48 w-full">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="md:w-2/4 p-4 flex flex-col justify-between">
          <div>
            {/* Category */}
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.category}
            </div>
            
            {/* Title */}
            <Link to={`/products/${product.id}`} className="block">
              <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                {product.title}
              </h3>
            </Link>
            
            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating?.rate || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="md:w-1/4 p-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200">
          <div className="flex justify-between items-center md:flex-col md:items-end">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full bg-gray-100 transition-colors ${isWishlisted ? 'text-red-500 bg-red-100' : 'text-gray-600 hover:bg-gray-200'}`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="flex items-center justify-end">
              <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              In Stock
            </p>
            <p className="text-right mt-1">Free shipping</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;