import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="about-section mt-28 flex flex-col m-12 p-10 justify-center w-[80%] mx-auto bg-[#f4f1eb]">
      <div className="content mx-auto mb-10 text-center">
        <motion.img
          src="/brand-logo.jpeg"
          alt="brand-logo"
          className="rounded-full h-[28rem] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.p
          className="text-5xl font-semibold mt-6 text-[#4A3C31]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="font-bold">Brew & Brew Coffee Co.</span>
        </motion.p>
        <motion.p
          className="font-light text-2xl mt-4 text-[#6F4F28]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Every cup tells a story. Our journey began with a passion for quality coffee and a love for the community. We believe that coffee is more than just a drink—it’s an experience, a moment of connection, and a source of inspiration.
        </motion.p>
      </div>
      <div className="details md:w-[70%] mx-auto">
        <motion.div
          className="flex flex-col gap-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <AboutComponent
            title={'Our Story'}
            description={'At Brew & Brew Coffee Co., we started as a small neighborhood coffee shop with a big dream: to create a place where people could gather, relax, and enjoy the finest coffee. Over the years, our passion for crafting the perfect cup of coffee has grown, and so has our commitment to sustainability, quality, and community.'}
          />
          <AboutComponent
            title={'Our Coffee'}
            description={'We source our coffee beans from the best farms around the world, ensuring that each cup is rich in flavor and full of character. Our skilled baristas take pride in every pour, whether it’s a classic espresso, a smooth latte, or a refreshing cold brew. We believe in transparency, and that’s why we only work with ethical suppliers who care about their workers and the environment.'}
          />
          <AboutComponent
            title={'Our Community'}
            description={'Brew & Brew Coffee Co. is more than just a coffee shop; it’s a hub for creativity, conversation, and connection. We host regular events, from coffee tastings to live music nights, all designed to bring people together. Our space is your space—a warm, welcoming environment where everyone is invited to savor the moment.'}
          />
        </motion.div>
      </div>
    </section>
  );
}

const AboutComponent = ({ title, description }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <p className="text-4xl font-semibold text-[#4A3C31]">{title}</p>
      <p className="font-light mt-4 text-lg text-[#6F4F28]">{description}</p>
    </motion.div>
  );
};
