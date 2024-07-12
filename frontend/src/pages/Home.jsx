import React, { useContext, useState } from "react";
import { CoffeeContext } from "../components/ApifetchExample";
import CoffeeCard from "../components/CoffeeCard";
import Modal from "../components/Modal";
import axios from 'axios';


const Home = () => {
  const { data, loading, orders, setOrders } = useContext(CoffeeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen,setIsOpen]=useState(false);
  const [cancelModal,setCancelModal]=useState(false);

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
      const orderItems = orders.map(order => ({
        name: order.title,  
        price: order.price,
        image: order.image,
        id: order.id
      }));
  
      const response = await axios.post("https://cafe-app-backend-nine.vercel.app", {
        orders: orderItems,
        totalPrice,
        gst,
        finalPrice,
      });
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
  };

  const handleCancelOrder=()=>{
    setOrders([]);
    setIsModalOpen(!toggleModal);
  }

  return (
    <div className="px-10 overflow-hidden bg-black text-white">
      <div className="flex  flex-row justify-center  text-nowrap overflow-hidden">
        

        <button className="w-auto rounded-full m-2 px-4 py-2 border-2 hover:bg-amber-600" onClick={toggleModal}>
          Your Orders
        </button>
        <button className="w-auto rounded-full m-2 px-4 py-2 border-2 hover:bg-amber-600">
          Added Items ({orders.length})
        </button>
      </div>
      <div className="grid sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.map((coffee, index) => (
            <CoffeeCard key={index} coffee={coffee} />
          ))
        )}
      </div>
      <div className="">
      <Modal isOpen={isModalOpen} onClose={toggleModal} >
        <h2 className="text-3xl text-black font-semibold mb-4">Your Orders</h2>
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
                    <td className="font-bold text-black text-xl uppercase">Gst</td>
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
      </div>

    </div>
  );
};

export default Home;
