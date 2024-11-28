import React, { useContext, useState } from "react";
import { CoffeeContext } from "../components/ApifetchExample";
import CoffeeCard from "../components/CoffeeCard";
import Modal from "../components/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Menu = () => {
  const { data, loading, orders, setOrders } = useContext(CoffeeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notify = () =>
    toast.success("Order placed successfully!", { position: "top-center" });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const totalPrice = orders.reduce((total, order) => total + order.price, 0);

  const gstPrice = () =>
    totalPrice > 0 ? parseFloat((totalPrice * 0.18).toFixed(2)) : 0;
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
        //   "http://localhost:5000",
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

  const handlePlaceOrder = () => {
    placeOrder();
    toggleModal();
    notify();
  };

  const handleCancelOrder = () => {
    setOrders([]);
    setIsModalOpen(false);
  };

  const filteredData = data.filter((coffee) =>
    coffee.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-16 mx-auto overflow-hidden w-[80%]">
      <div className="search mt-16 border-2 p-2 w-2/3 mx-auto rounded-full active:bg-slate-50 shadow-lg">
        <input
          type="search"
          name="search-form"
          id="search-form"
          placeholder="Search for your Coffee"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 outline-none active:bg-slate-50"
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
      <div className="grid grid-cols-2 m-5 md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredData.map((coffee, index) => (
            <CoffeeCard
              key={index}
              coffee={coffee}
              orderCount={
                orders.filter((order) => order.id === coffee.id).length
              }
            />
          ))
        )}
      </div>
      <div className="">
        <div className="">
          <Modal isOpen={isModalOpen} onClose={toggleModal}>
            <h2 className="text-2xl font-semibold text-black border-b-2 border-gray-200 pb-2 mb-4">
              Your Orders
            </h2>
            <div className="flex flex-col">
              <table className="w-full text-sm text-left text-gray-600">
                <tbody>
                  {orders.length > 0 ? (
                    // Group items by title and calculate the quantity and price
                    Object.entries(
                      orders.reduce((acc, order) => {
                        const existingOrder = acc[order.title];
                        if (existingOrder) {
                          existingOrder.quantity += 1;
                          existingOrder.price += order.price;
                        } else {
                          acc[order.title] = { ...order, quantity: 1 };
                        }
                        return acc;
                      }, {})
                    ).map(([title, order], index) => (
                      <tr key={index} className="mb-2">
                        <td className="font-semibold text-xl">{order.title}</td>
                        <td className="font-bold text-lg text-right">
                          Rs {order.price.toFixed(2)}
                        </td>
                        <td className="font-bold text-lg text-right">
                          x {order.quantity}
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
                      <tr className="border-t-2 ">
                        <td className="font-bold  text-black text-xl uppercase">
                          GST
                        </td>
                        <td className="font-bold text-xl text-right">
                          Rs {gst}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-xl uppercase text-black">
                          Total
                        </td>
                        <td className="font-bold text-xl text-black text-right">
                          Rs {finalPrice.toFixed(2)}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              {orders.length > 0 && (
                <div className="my-1 flex flex-col gap-1 font-semibold">
                  <button
                    className={`w-full p-2 ${
                      orders.length
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : "bg-gray-300"
                    } rounded-md`}
                    onClick={handlePlaceOrder}
                    disabled={!orders.length}
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
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="colored"
      />
    </div>
  );
};

export default Menu;
