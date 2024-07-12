import React, { useContext , useState} from "react";
import { CoffeeContext } from "./ApifetchExample";

const CoffeeCard = ({ coffee }) => {
  const { title, image, price } = coffee;
  const { addOrder } = useContext(CoffeeContext);
  const [toggleClick,setToggleClick]=useState(0);

  const handleOrder = () => {
    addOrder(coffee);
    setToggleClick(toggleClick+1);
  };

  return (
    <section className="flex flex-col items-center mt-2 p-4 rounded-md space-y-4 hover:border">
      <div className="flex flex-col items-center space-y-4 rounded-md backdrop-blur-[6px] text-black ">
        <h1 className="text-center text-amber-300 font-semibold  text-2xl ">
          {title}
        </h1>
        <img src={image} alt="coffee" className="rounded-md" sync/>
        <div className="flex w-full gap-2 flex-col md:flex-row">
          <button className="flex-1 h-10 rounded-full font-semibold text-lg  bg-amber-400 hover:bg-amber-300">
            Rs {price}
          </button>
          <button
            className="flex-1 h-10 rounded-full font-semibold text-lg  bg-amber-600 hover:bg-amber-700"
            onClick={handleOrder}
          >
            {toggleClick>0 ? `ADD (${toggleClick})`:"ADD"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoffeeCard;
