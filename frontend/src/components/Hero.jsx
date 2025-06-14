import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden h-[32rem] md:h-[42rem] lg:h-[48rem]">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="w-full h-full relative">
          <img
            src="./hero2-img.jpg"
            alt="hero"
            className="w-full h-full object-cover"
          />
          
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          
          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 50,
                  opacity: 0 
                }}
                animate={{ 
                  y: -50, 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif leading-tight">
              <span className="inline-block bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
                Bean & Brew
              </span>
            </h1>
            
            {/* Glowing Effect Behind Text */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-3xl scale-110 -z-10" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-white/90 leading-relaxed max-w-3xl mx-auto px-4"
          >
            Discover the perfect blend of rich flavors and cozy ambiance. At Bean &
            Brew, we craft every cup with care and passion, inviting you to savor
            every moment.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.3, ease: "easeOut" }}
            className="mt-8 sm:mt-10"
          >
            <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)",
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden px-8 py-4 text-lg sm:text-xl font-semibold text-black bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button Text */}
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Learn More</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl"
                  >
                    →
                  </motion.span>
                </span>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 -top-2 -left-2 w-0 h-full bg-white/20 skew-x-12 group-hover:w-[calc(100%+1rem)] transition-all duration-700" />
              </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-32 h-32 bg-amber-400/10 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 right-8 w-24 h-24 bg-orange-500/10 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/10 rounded-full blur-xl" />
    </div>
  );
};

export default Hero;