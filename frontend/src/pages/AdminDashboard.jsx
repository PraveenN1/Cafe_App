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
        // const response = await axios.get("http://localhost:5000/admin/dashboard/orders");
        setOrders(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 mt-32 flex flex-col justify-center mx-auto">
      <section className="mx-auto ">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Welcome to the admin dashboard! Manage your data here.</p>
      </section>
      
      <ul className="max-w-screen-md text-center space-y-8 ">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-component border-2 border-black m-2  rounded-md">
              <div className="order-row-1 grid grid-cols-4 bg-amber-300 rounded-t-[0.250rem]">
                <p className="border-2 border-black m-2 p-1">{order._id.toString().slice(0,4)+order._id.toString().slice(-5)}</p>
                <p className="border-2 border-black m-2 p-1">{order.tokenId}</p> {/* If tokenId is available */}
                <p className="border-2 border-black m-2 p-1">{order.username}</p> {/* If username is available */}
                <p className="border-2 border-black m-2 p-1">{new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div className="order-row-2 flex bg-slate-600 text-white font-semibold rounded-b-[0.250rem]">
                <div className="order-2-col1 flex-row basis-3/4">
                  {/* Order items */}
                  {order.orders.map((item, itemIndex) => (
                    <div key={itemIndex} className="order-details flex ">
                      <p className="border-r-2 border-gray-400 m-2 p-1 basis-2/4">{item.name}</p>
                      <p className="  border-gray-400 m-2 p-1 basis-1/4">1</p> {/* Assuming quantity is 1, adjust based on your schema */}
                      <p className="border-x-2  border-gray-400 m-2 p-1 basis-1/4">{item.price}</p>
                      <p className=" border-gray-400 m-2 p-1 basis-1/4">{item.price}</p> {/* Assuming total is same as price */}
                    </div>
                  ))}
                  <div className="total-price border-2 border-black m-2 p-1">
                    <p>Total Price:Rs {order.totalPrice} </p>
                    <p>GST: Rs {order.gst}</p>
                    <p>Final Price: Rs {order.finalPrice}</p>
                  </div>
                </div>

                <div className="order-2-col2 m-2 p-1 basis-1/4">
                  <div className="order-status border-2 border-black m-2 p-1">
                    <p>Status: {order.status || "Pending"}</p> {/* Assuming status is a field */}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminDashboard;
