import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon as CheckCircle, ShoppingBagIcon as ShoppingBag, HomeIcon as Home } from '@heroicons/react/24/outline';

const OrderSuccess = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Your order has been placed successfully and is being processed.
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
          
          <div className="flex flex-col space-y-4 text-left">
            <div className="flex justify-between border-b border-gray-200 pb-4">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium text-gray-900">{orderNumber}</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-4">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-4">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium text-gray-900">Credit Card (****1234)</span>
            </div>
            
            <div className="flex justify-between border-b border-gray-200 pb-4">
              <span className="text-gray-600">Shipping Method:</span>
              <span className="font-medium text-gray-900">Standard Shipping (3-5 business days)</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium text-gray-900">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          We've sent a confirmation email to your registered email address with all the details of your order.
          If you have any questions, please contact our customer support.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;