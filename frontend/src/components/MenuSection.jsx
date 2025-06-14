import { useState } from "react";
import { Link } from "react-router-dom";
const MenuSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 lg:py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-100/20 to-amber-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="coffee-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" className="text-amber-800"/>
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-amber-600"/>
              <circle cx="50" cy="50" r="1" fill="currentColor" className="text-amber-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#coffee-pattern)"/>
        </svg>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-lg">
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
          <span className="text-sm font-semibold text-amber-800 tracking-wide">EXPLORE OUR OFFERINGS</span>
        </div>

        {/* Main heading with gradient text */}
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-900 via-orange-800 to-yellow-700 bg-clip-text text-transparent">
          Our Menu
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover a world of flavors crafted with passion, from signature blends to artisanal treats
        </p>

        {/* Enhanced CTA Button */}
        <div className="relative inline-block">
          {/* Floating decoration around button - positioned behind */}
          <div className={`absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl transition-opacity duration-500 -z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <Link
            to="/menu"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Content */}
            <span className="relative z-10 mr-2 transition-transform duration-300 group-hover:scale-105">
              View Full Menu
            </span>
            
            {/* Animated arrow */}
            <svg 
              className="relative z-10 w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center items-center mt-16 gap-4">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24"></div>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 300}ms` }}
              ></div>
            ))}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24"></div>
        </div>

        {/* Coffee beans floating animation */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-amber-700 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-orange-600 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/3 right-1/6 w-2.5 h-2.5 bg-yellow-700 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
      </div>
    </section>
  );
};

export default MenuSection;