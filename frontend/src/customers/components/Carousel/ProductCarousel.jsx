import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

//All Images
// import CarouselImage1 from "../../../assets/CarouselImages/1.png";
// import CarouselImage2 from "../../../assets/CarouselImages/2.png";
// import CarouselImage3 from "../../../assets/CarouselImages/3.png";
// import CarouselImage4 from "../../../assets/CarouselImages/4.png";
// import CarouselImage5 from "../../../assets/CarouselImages/5.png";
// import CarouselImage6 from "../../../assets/CarouselImages/6.png";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import { mens_kurta } from "../../../Data/men_kurta";
// import { data } from "react-router-dom";

// const images = [CarouselImage1,CarouselImage2,CarouselImage3,CarouselImage4,CarouselImage5,CarouselImage6,];

const ProductCarousel = ({data,sectionName}) => {
    const[activeIndex,setActiveIndex] = useState(0);
    const responsive = {
        0: {
          items: 1,
        },
        720: {
          items: 3, 
        },
        1024: {
          items: 5.5,
          itemsFit: "contain",
        },
      };
      
      const slidePrev = () => {
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      };
      
      const slideNext = () => {
        if (activeIndex < items.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
      };   

      const syncActiveIndex = (e) => {
        console.log("Active Index Updated:", e.item); // Debugging log
        setActiveIndex(e.item);
      };     ;
  const items = data.slice(0,10).map((item) => <HomeSectionCard product={item}/>); 

  return (
    <div className="border border-gray-100">
      <div className="max-w-6xl mx-auto text-center pb-6">
        {/* Section Heading */}
        <h2 className="text-4xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
       
      </div>

       

      <div className="relative p-5 ">
      <AliceCarousel
        key={activeIndex} // Force re-render
        items={items}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        onSlideChanged={syncActiveIndex}
        activeIndex={activeIndex} // Ensure it updates
        animationDuration={500} // Smooth transition
/>
        {activeIndex !==0  && <Button
          variant="contained"
          className="z-50"
          onClick={slidePrev}
          sx={{
            position: "absolute",
            top: "8rem",
            left: "0rem",
            transform: "translateX(-50%) rotate(90deg)",
            bgcolor: "darkblue",
          }}
          arial-lebel="prev"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(-90deg)", color: "white" }}
          />
        </Button>}
       {activeIndex !== items.length-5 && <Button
          variant="contained"
          className="z-50"
          onClick={slideNext}
          sx={{
            position: "absolute",
            top: "8rem",
            right: "0rem",
            transform: "translateX(50%) rotate(90deg)",
            bgcolor: "darkblue"
          }}
          arial-lebel="next"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "white" }}
          />
        </Button>}
      </div>
    </div>
  );
};

export default ProductCarousel;
