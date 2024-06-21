import React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import "./Brand.scss";
import { useState, useEffect, useRef } from "react";
import { listBrand } from "./BrandList";

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "none" }}
      onClick={onClick}
    />
  );
}

export default function Brand({ initialSlide = 0 }) {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  const [hasSetPosition, setHasSetPosition] = useState(false);
  const slider = useRef();

  useEffect(() => {
    if (slider.current && !hasSetPosition) {
      slider.current.slickGoTo(initialSlide);
      setHasSetPosition(true);
    }
  }, [initialSlide, hasSetPosition, slider]);

  const groupedBrands = [];
  for (let i = 0; i < listBrand.length; i += 8) {
    groupedBrands.push(listBrand.slice(i, i + 8));
  }

  return (
    <>
      <div className="titleBrand mt-5">
        <h2>Brand</h2>
      </div>

      <div className="brand_container">
        <Slider ref={slider} {...settings}>
          {groupedBrands.map((group, index) => (
            <div key={index} className="slide">
              <div className="brand_row">
                {group.slice(0, 4).map((brand) => (
                  <a href={brand.title} className="brand_detail" key={brand.id}>
                    <img src={brand.img} alt={brand.alt} />
                  </a>
                ))}
              </div>
              <div className="brand_row">
                {group.slice(4, 8).map((brand) => (
                  <a href={brand.title} className="brand_detail" key={brand.id}>
                    <img src={brand.img} alt={brand.alt} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
