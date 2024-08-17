import React from "react";

export default function About() {
  return (
    <section
      className="max-container padding-container mb-5 p-5 h-auto flex flex-col items-center bg-[url('/about-page.png')] bg-cover bg-no-repeat text-[#efdfd0] relative my-24"
      style={{ backgroundPosition: "center center" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative z-10 w-full flex flex-col items-center text-center mb-10">
        <p className="text-xl lg:text-2xl w-full lg:w-2/3 leading-relaxed text-yellow-50 backdrop-blur-sm p-6 rounded-md shadow-lg">
          Welcome to <span className="font-bold">Brew & Brew Coffee Co.</span>, where every cup tells a story. Our journey began with a passion for quality coffee and a love for the community. We believe that coffee is more than just a drink—it’s an experience, a moment of connection, and a source of inspiration.
        </p>
      </div>
      <div className="relative z-10 w-full flex flex-col lg:flex-row gap-10 items-center justify-center">
        <div className="w-full lg:w-2/3 flex flex-col gap-5 backdrop-blur-sm bg-opacity-75 p-8 rounded-md shadow-lg">
          <h2 className="text-3xl font-bold text-yellow-50">Our Story</h2>
          <p className="text-lg leading-relaxed text-yellow-200">
            At Brew & Brew Coffee Co., we started as a small neighborhood coffee shop with a big dream: to create a place where people could gather, relax, and enjoy the finest coffee. Over the years, our passion for crafting the perfect cup of coffee has grown, and so has our commitment to sustainability, quality, and community.
          </p>
          <h2 className="text-3xl font-bold text-yellow-50">Our Coffee</h2>
          <p className="text-lg leading-relaxed text-yellow-200">
            We source our coffee beans from the best farms around the world, ensuring that each cup is rich in flavor and full of character. Our skilled baristas take pride in every pour, whether it’s a classic espresso, a smooth latte, or a refreshing cold brew. We believe in transparency, and that’s why we only work with ethical suppliers who care about their workers and the environment.
          </p>
          <h2 className="text-3xl font-bold text-yellow-50">Our Community</h2>
          <p className="text-lg leading-relaxed text-yellow-200">
            Brew & Brew Coffee Co. is more than just a coffee shop; it’s a hub for creativity, conversation, and connection. We host regular events, from coffee tastings to live music nights, all designed to bring people together. Our space is your space—a warm, welcoming environment where everyone is invited to savor the moment.
          </p>
        </div>
      </div>
    </section>
  );
}
