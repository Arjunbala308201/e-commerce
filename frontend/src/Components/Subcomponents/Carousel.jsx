import React from "react";
import Slider from "react-slick";
import carosel1 from "../../assets/Carosel Image/carosel1.webp";
import carosel2 from "../../assets/Carosel Image/carosel3.webp";
import carosal4 from '../../assets/Carosel Image/carousal.webp'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-gray-200 rounded-full p-2"
      onClick={onClick}
    >
      <FaChevronRight/>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-gray-200 rounded-full p-2"
      onClick={onClick}
    >
        <FaChevronLeft />
    </div>
  );
}

export const Carousel = () => {
  const settings = {
    dots: true,           // Show navigation dots
    infinite: true,       // Infinite looping
    speed: 500,           // Slide transition speed
    slidesToShow: 1,      // Number of slides visible
    slidesToScroll: 1,    // Number of slides to scroll per click
    autoplay: true,       // Enable autoplay
    autoplaySpeed: 3000,  // 3-second interval
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom prev arrow
  };

  return (
    <div className="bg-gray-100">
      <div className="w-full mx-auto relative">
        <Slider {...settings}>
          <div className="">
          <Link>
            <img src={carosel1} alt="Carosel 1" className="object-cover w-full h-32 sm:h-64 mx-auto" />
          </Link>
          </div>
          <Link  to={`/outlet/electronics`}>
            <img src={carosel2} alt="Carosel 2" className="object-cover w-full h-32 sm:h-64 mx-auto" />
          </Link>
          <Link to={`/outlet/toys`}>
            <img src={carosal4} alt="Carosel 3" className="object-cover w-full h-32 sm:h-64 mx-auto" />
          </Link>
        </Slider>
      </div>
    </div>
  );
};
