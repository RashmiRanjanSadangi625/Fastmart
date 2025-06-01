import React from "react";

const Testimonials = () => {
  const brands = [
    { name: "Boat", logo: "/apple.svg" },
    { name: "Gloat", logo: "/facebook.svg" },
    { name: "H & M", logo: "/marvel.svg" },
    { name: "Borderland", logo: "/react.svg" },
    { name: "Nike", logo: "/nike.svg" },
    { name: "Tripr", logo: "/airbnb.svg" },
  ];

  return (
    <section className="bg-white py-10 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto text-center pb-6">
        {/* Section Heading */}
        <h2 className="text-6xl font-bold text-gray-900">Testimonials</h2>
       
      </div>

      <div className="max-w-10xl mx-auto flex flex-col md:flex-row items-center gap-10 mt-12">
        {/* Left Text Content */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-blue-950">Great service always sky rocket the business</span> ultimately,
            ,Building brands.
          </h2>
          <p className="text-gray-600 mt-4">
            Suspendisse aliquam tellus ante, porttitor mattis diam eleifend
            quis. Pellentesque pulvinar commodo eros sit amet finibus.
          </p>
          <a
            href="#"
            className="mt-6 inline-block text-yellow-500 font-semibold hover:underline"
          >
            ALL BRANDS WERE ONBAORDED
          </a>
        </div>

        {/* Right Logos */}
        <div className="md:w-1/2 grid grid-cols-3 gap-4">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-blue-950 text-white p-6 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all"
            >
              <p>{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
