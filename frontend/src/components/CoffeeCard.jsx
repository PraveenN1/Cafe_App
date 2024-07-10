import React, { useContext } from "react";
import { CoffeeContext } from "./ApifetchExample";

const CoffeeCard = ({ coffee }) => {
  const { title, image, price } = coffee;
  const { addOrder } = useContext(CoffeeContext);

  const handleOrder = () => {
    addOrder(coffee);
  };

  return (
    <section className="flex flex-col items-center p-4 rounded-md border space-y-4">
      <div className="flex flex-col items-center space-y-4 rounded-md backdrop-blur-[6px]">
        <h1 className="text-center font-semibold text-black text-2xl uppercase ">
          {title}
        </h1>
        <img src={image} alt="coffee" className="rounded-md" sync/>
        <div className="flex w-full gap-4">
          <button className="flex-1 h-10 rounded-md font-semibold text-lg border-2 bg-amber-400">
            Rs {price}
          </button>
          <button
            className="flex-1 h-10 rounded-md font-semibold text-lg border-2 bg-amber-600 text-white"
            onClick={handleOrder}
          >
            ADD
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoffeeCard;
