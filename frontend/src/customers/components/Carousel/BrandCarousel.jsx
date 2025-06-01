import React from 'react'
import "../.././../styles/App.css"


function BrandCarousel() {
    const brands = [
        "Nike", "Adidas", "Puma", "Reebok", "Under Armour", "New Balance", "Fila", "Asics",
        "Converse", "Vans", "Skechers", "Jordan", "Hoka", "Brooks", "Mizuno", "Saucony",
        "Salomon", "Merrell", "Timberland", "Columbia", "North Face", "Lotto", "Kappa",
        "Umbro", "Diadora", "Anta", "Peak", "361°", "Yonex", "Champion"
      ];
  
    return (
      <div className="bg-white py-10 overflow-hidden">
         <h2 className="flex items-center justify-center pb-15 text-6xl font-bold text-gray-900">Brands</h2>
        <div className="flex gap-6 animate-scroll whitespace-nowrap">
            
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="px-6 py-4 bg-gray-100 text-2xl font-bold text-gray-800 rounded-xl shadow-md flex-shrink-0"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    );
  }
  



export default BrandCarousel
