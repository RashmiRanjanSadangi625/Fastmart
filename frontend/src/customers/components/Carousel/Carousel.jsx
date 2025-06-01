import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

//All Images
import CarouselImage1 from "../../../assets/CarouselImages/1.png";
import CarouselImage2 from "../../../assets/CarouselImages/2.png";
import CarouselImage3 from "../../../assets/CarouselImages/3.png";
import CarouselImage4 from "../../../assets/CarouselImages/4.png";
import CarouselImage5 from "../../../assets/CarouselImages/5.png";

const images = [ CarouselImage1,CarouselImage2,CarouselImage3,CarouselImage4,CarouselImage5,];

const Carousel = () => {
  const items = images.map((image, index) => (
    <div className="item" key={index}>
      <img
        className="cursor-pointer"
        src={image}
        alt={`Slide ${index + 1}`}
        role="presentation"
        height={500}
      />
    </div>
  ));

  return (
    <AliceCarousel
      items={items}
      autoPlay
      autoPlayInterval={2000}
      infinite
      disableButtonsControls
    />
  );
};

export default Carousel;
