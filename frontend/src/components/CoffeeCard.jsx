import React, { useContext } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { CoffeeContext } from "./ApifetchExample";

const CoffeeCard = ({ coffee, orderCount }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { title, image, price } = coffee;
  const { addOrder } = useContext(CoffeeContext);

  const handleOrder = () => addOrder(coffee);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className="card-component flex flex-col items-center p-2 rounded-lg space-y-6 border-2 shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
    >
      {inView ? (
        <div className="flex flex-col items-center space-y-4 text-black">
          <div className="">
            <img
              src={image}
              alt={title}
              className="rounded-lg shadow-md object-cover"
            />
          </div>
          <h1 className="text-center text-amber-500 font-bold text-xl sm:text-2xl tracking-wide">
            {title}
          </h1>
          <div className="flex w-full gap-2 flex-col sm:flex-row">
            <button className="flex-1 h-12 rounded-full font-semibold text-lg border-2 hover:bg-amber-300 transition-colors duration-200">
              Rs {price}
            </button>
            <button
              className="flex-1 h-12 rounded-full font-semibold text-lg text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-200"
              onClick={handleOrder}
            >
              {orderCount > 0 ? `ADD ${orderCount}` : "ADD"}
            </button>
          </div>
        </div>
      ) : (
        <div className="border p-4 rounded-lg bg-white shadow-md h-72">
          <div className="w-full h-full flex items-center justify-center">
            <p>Loading...</p>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default CoffeeCard;
