import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://cafe-app-backend-nine.vercel.app/admin/dashboard/orders");
        setOrders(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-lg text-gray-700">Loading orders...</p>;
  if (error) return <p className="text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 mt-32 flex flex-col justify-center items-center mx-auto w-full max-w-4xl">
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Manage all incoming orders efficiently.</p>
      </section>

      <ul className="w-full space-y-6">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="border border-gray-300 shadow-lg rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="flex justify-between items-center bg-amber-300 px-4 py-3">
                <p className="font-medium">
                  Order ID: <span className="font-bold">{order._id.slice(2, 5) + order._id.slice(-3)}</span>
                </p>
                <p className="text-sm text-gray-800">{new Date(order.createdAt).toLocaleString()}</p>
              </div>

              {/* Order Details */}
              <div className="bg-gray-100 px-4 py-3">
                {order.orders.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center border-b border-gray-300 py-2">
                    <p className="w-1/2">{item.name}</p>
                    <p className="w-1/4 text-center">x1</p>
                    <p className="w-1/4 text-right">₹{item.price}</p>
                  </div>
                ))}
                
                {/* Price Summary */}
                <div className="flex justify-between font-semibold mt-3 text-gray-800">
                  <p>Total: ₹{order.totalPrice}</p>
                  <p>GST: ₹{order.gst}</p>
                  <p>Final: ₹{order.finalPrice}</p>
                </div>
              </div>

              {/* Order Status */}
              <div className="px-4 py-3 bg-white">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    order.status === "Completed"
                      ? "bg-green-200 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  Status: {order.status || "Pending"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;
