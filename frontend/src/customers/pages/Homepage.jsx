import React, { useEffect } from 'react'
import Carousel from '../../customers/components/Carousel/Carousel'
import ProductCarousel from '../../customers/components/Carousel/ProductCarousel'
import { useDispatch, useSelector } from 'react-redux'
import Testimonials from '../components/Testimonial/Testimonials'
import BrandCarousel from '../components/Carousel/BrandCarousel'

import { productsSearchByCategory } from "../../State/Product/Action";

const Homepage = () => {  
  const dispatch = useDispatch();
  const { homepageProducts } = useSelector(state => state.products);

  useEffect(() => {
    const categoryList = ["mens_kurta", "Gown", "men_jeans"];
    dispatch(productsSearchByCategory(categoryList));
  }, [dispatch]);

  // Format raw section names like "mens_kurta" -> "Men's Kurta"
  const formatSectionName = (rawName) => {
    return rawName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace('Mens', "Men's")
      .replace('Womens', "Women's")
      .replace('Men', "Men's")
  };

  return (
    <> 
      <Carousel />
      <BrandCarousel />
      
      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        {homepageProducts?.map((section, i) => (
          <ProductCarousel
            key={i}
            data={section.products}
            sectionName={formatSectionName(section.sectionName)}
          />
        ))}
      </div>

      <div>
        <Testimonials />
      </div>
    </>
  );
};

export default Homepage;
