import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/products/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-4">Browse products and add them to your wishlist!</p>
          <Link to="/products" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 