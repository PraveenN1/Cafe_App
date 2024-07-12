import React from "react";

const Hero = () => {
  return (
    <div className="relative">
      <div className="relative">
        <img src="./hero-img.png" alt="hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>
      <div className="absolute top-4 sm:top-10 left-5 m-2 p-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
          Bean &<br /><span className="text-5xl sm:text-7xl md:text-[11rem]">Brew</span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
