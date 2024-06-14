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
    slidesToShow: 3,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
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

  return (
    <>
      <div className="titleBrand mt-5">
        <h2>Brand</h2>
      </div>

      <div className="brand_container">
        <Slider {...settings}>
          {listBrand.map((list) => {
            return (
              <a href={list.title} className="brand_detail" key={list.id}>
                <img src={list.img} alt={list.atl} />
              </a>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
