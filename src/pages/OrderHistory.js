import React from 'react';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user || !user.email) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Please log in to view your order history.</h2>
        </div>
      </div>
    );
  }
  const key = `orderHistory_${user.email}`;
  const history = JSON.parse(localStorage.getItem(key) || '[]');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      {history.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">No Orders Found</h2>
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {history.map((order, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <div className="font-semibold text-lg text-indigo-700">Order #{order.orderNumber}</div>
                  <div className="text-gray-500 text-sm">{new Date(order.date).toLocaleString()}</div>
                </div>
                <div className="text-lg font-bold text-gray-900 mt-2 md:mt-0">
                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="py-2 flex items-center">
                      <img src={item.image} alt={item.title} className="h-12 w-12 object-contain rounded mr-4" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-gray-500 text-sm">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-gray-900 font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 