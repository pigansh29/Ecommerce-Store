import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateCartItemQuantity, clearCart } from '../redux/slices/cartSlice';
import { ShoppingBagIcon as ShoppingBag, TrashIcon as Trash, ArrowLeftIcon as ArrowLeft, ShoppingCartIcon as ShoppingCart } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const Cart = () => {
  const { items = [], totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
    toast.error(`${item.title.substring(0, 20)}... removed from cart`);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error('Cart cleared');
  };

  const handleCheckout = () => {
    if (!user) {
      toast.info('Please login to proceed to checkout');
      navigate('/login', { state: { from: '/cart' } });
    } else {
      navigate('/checkout');
    }
  };

  // Format price with currency symbol
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <ShoppingBag className="h-8 w-8 mr-3 text-indigo-600" />
        Your Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <ShoppingCart className="h-24 w-24 text-gray-300" />
            <h2 className="text-2xl font-medium text-gray-900">Your cart is empty</h2>
            <p className="text-gray-600 max-w-md">
              Looks like you haven't added any products to your cart yet. Browse our products and find something you like.
            </p>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cart Items ({totalQuantity})
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Clear Cart
                  </button>
                </div>
              </div>

              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="sm:ml-6 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900">
                            <Link to={`/products/${item.id}`} className="hover:text-indigo-600">
                              {item.title}
                            </Link>
                          </h3>
                          <p className="ml-4 text-base font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        {/* Quantity Selector */}
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-800 border-x">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveFromCart(item)}
                          className="text-sm text-red-600 hover:text-red-800 flex items-center"
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="p-6 border-t border-gray-200">
                <Link
                  to="/products"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-900 font-medium">{formatPrice(totalAmount)}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-900 font-medium">Free</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">Tax</p>
                  <p className="text-gray-900 font-medium">{formatPrice(totalAmount * 0.1)}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-900">Total</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(totalAmount + (totalAmount * 0.1))}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including VAT</p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>We accept:</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;