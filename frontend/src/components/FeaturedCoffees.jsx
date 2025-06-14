// import { Link } from "react-router-dom"; // Import this in your actual app
import { useState } from "react";

const FeaturedCoffees = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const coffees = [
    {
      title: "Espresso",
      desc: "Rich, full-bodied espresso with a smooth finish and notes of dark chocolate.",
      img: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=1887",
      price: "$4.50",
      rating: 4.8,
    },
    {
      title: "Cappuccino",
      desc: "A perfect balance of espresso, steamed milk, and velvety microfoam.",
      img: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&q=80&w=1887",
      price: "$5.25",
      rating: 4.9,
    },
    {
      title: "Latte",
      desc: "Smooth, creamy latte with artisanal milk art and a hint of sweetness.",
      img: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&q=60&w=800",
      price: "$5.75",
      rating: 4.7,
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
      {/* Background gradient blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-yellow-50/30 rounded-3xl blur-3xl -z-10"></div>
      
      {/* Header with modern typography */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-6">
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-amber-800 tracking-wide">FEATURED SELECTION</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-900 via-orange-800 to-yellow-700 bg-clip-text text-transparent mb-6">
          Signature Coffees
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover our carefully curated selection of premium coffee experiences, crafted with passion and precision
        </p>
      </div>

      {/* Cards grid with enhanced animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {coffees.map((coffee, index) => (
          <div
            key={index}
            className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
              hoveredIndex === index 
                ? 'shadow-2xl shadow-amber-200/50 ring-2 ring-amber-200' 
                : 'shadow-lg hover:shadow-xl'
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image container with overlay effects */}
            <div className="relative overflow-hidden">
              <img
                src={coffee.img}
                alt={coffee.title}
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Price badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-amber-800">{coffee.price}</span>
              </div>

              {/* Rating */}
              <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span className="text-xs text-white font-medium">{coffee.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-800 transition-colors duration-300">
                {coffee.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-2">
                {coffee.desc}
              </p>

              {/* CTA Button with modern design */}
              <a
                href="/menu"
                className="group/btn relative inline-flex items-center justify-center w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover/btn:scale-105">
                  Order Now
                </span>
                
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                
                {/* Arrow icon */}
                <svg 
                  className="relative z-10 w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Floating decoration */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-16">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoffees;