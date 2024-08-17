import React, { useContext, useState } from "react";
import { CoffeeContext } from "../components/ApifetchExample";
import CoffeeCard from "../components/CoffeeCard";
import Modal from "../components/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { data, loading, orders, setOrders } = useContext(CoffeeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");  

  const notify = () =>
    toast.success("Order placed successfully!", {
      position: "top-center",
    });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const totalPrice = orders.reduce((total, order) => total + order.price, 0);

  const gstPrice = () => {
    if (totalPrice > 0) {
      const gst = (totalPrice * 0.18) / 10;
      const gstStr = gst.toString();
      return Number(gstStr.slice(0, 4));
    }
    return 0;
  };

  const gst = gstPrice();
  const finalPrice = totalPrice + gst;

  const cancelOrder = (index) => {
    const updatedOrders = orders.filter(
      (_, orderIndex) => orderIndex !== index
    );
    setOrders(updatedOrders);
  };

  const placeOrder = async () => {
    try {
      const orderItems = orders.map((order) => ({
        name: order.title,
        price: order.price,
        image: order.image,
        id: order.id,
      }));

      const response = await axios.post(
        "https://cafe-app-backend-nine.vercel.app",
        {
          orders: orderItems,
          totalPrice,
          gst,
          finalPrice,
        }
      );
      console.log("Order placed:", response.data);
      setOrders([]);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const logOrders = () => {
    console.log("Current orders:", orders);
  };

  const handlePlaceOrder = () => {
    placeOrder();
    logOrders();
    toggleModal();
    notify();
  };

  const handleCancelOrder = () => {
    setOrders([]);
    setIsModalOpen(false);
  };

  // Filter the coffee data based on the search query
  const filteredData = data.filter((coffee) =>
    coffee.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-16 mx-auto px-10 overflow-hidden">
      <div className="search mt-16 border-2 p-2 w-2/3 mx-auto rounded-full active:bg-slate-50 shadow-lg">
        <input
          type="search"
          name="search-form"
          id="search-form"
          placeholder="Search for your Coffee"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 outline-none active:bg-slate-50 "
        />
      </div>
      <div className="mx-auto flex sm:flex-row justify-center text-nowrap overflow-hidden space-x-4 text-white">
        <button
          className="w-auto rounded-full mt-10 px-4 py-2 border-2 bg-black hover:bg-amber-600 hover:font-semibold"
          onClick={toggleModal}
        >
          Your Orders
        </button>
        <button className="w-auto rounded-full mt-10 px-4 py-2 border-2 bg-black hover:bg-amber-600 hover:font-semibold">
          Added Items ({orders.length})
        </button>
      </div>
      <div className="grid grid-cols-2 m-5  md:grid-cols-3 lg:grid-cols-5 gap-4 container mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredData.map((coffee, index) => (
            <CoffeeCard key={index} coffee={coffee} />
          ))
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className="text-3xl text-black font-semibold mb-4">
          Your Orders
        </h2>
        <div className="flex flex-col">
          <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index} className="mb-2">
                    <td className="font-semibold text-xl">{order.title}</td>
                    <td className="font-bold text-lg text-right">
                      Rs {order.price}.00
                    </td>
                    <td>
                      <button
                        className="w-full text-3xl rounded-md"
                        onClick={() => cancelOrder(index)}
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No orders yet.</td>
                </tr>
              )}
              {orders.length > 0 && (
                <>
                  <tr>
                    <td className="font-bold text-black text-xl uppercase">
                      Gst
                    </td>
                    <td className="font-bold text-xl text-right">Rs {gst}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-xl uppercase text-black">
                      Total
                    </td>
                    <td className="font-bold text-xl text-black text-right">
                      Rs {finalPrice}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          {orders.length > 0 && (
            <div className="my-1 flex flex-col gap-1 font-semibold">
              <button
                className="w-full p-2 bg-yellow-400 hover:bg-yellow-500 rounded-md"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
              <button
                className="w-full p-2 bg-red-400 hover:bg-red-500 rounded-md"
                onClick={handleCancelOrder}
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Home;
