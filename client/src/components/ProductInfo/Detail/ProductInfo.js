import React, { useContext, useEffect, useState } from "react";
import "./Productinfo.scss";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CartContext } from "../../Cart/CartContext";
import { formatVND } from "../../../utils/Format";
import { MainAPI } from "../../API";

export default function ProductInfo({ product }) {
  const { handleAddToCart } = useContext(CartContext);
  const { id } = useParams()

  console.log(id)

  return (
    <>
      <div key={product.product_id} className="productInfo_container">
        <div className="back_home">
          <Link to={"/home"}>
            <FaHome />
            &nbsp;Back To Home
          </Link>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 info">
              <div className="ptc">
                <img src={product.image_url} />
              </div>
            </div>

            <div className="col-md-6 info">
              <div className="milk_name">
                <h3>{product.product_name}</h3>
              </div>
              <div className="brand">
                Brand:&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "#DB7093" }}>{product.brand_name}</span>
              </div>

              <div className="name">
                Name Of Product:&nbsp;&nbsp;&nbsp;{product.product_name}
              </div>

              <div className="feed_rate">
                Rating: &nbsp;&nbsp;<span style={{ color: 'red' }}>{product.age_range}</span>
              </div>

              <div className="feed_rate">
                Description: &nbsp;&nbsp;{product.description}
              </div>

              <div className="price">
                Price:&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{formatVND(product.price)}</span>
              </div>

              <div className="add_buy">
                <span>
                  <button
                    className="btn_add"
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                  >
                    Add To Cart
                  </button>
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="other_detail">
        Share:&nbsp;
        <a
          style={{ width: "10%" }}
          href="https://www.facebook.com/"
          target="_blank"
        >
          <FaFacebookSquare />
        </a>
        &nbsp;&nbsp;
        <a href="https://www.instagram.com/" target="_blank">
          <FaInstagramSquare />
        </a>
        &nbsp;&nbsp;<span>||</span>&nbsp;&nbsp;
        <FaHeart color="red" /> &nbsp;&nbsp;Liked! &nbsp;{" "}
        <span>(100)</span>
      </div>
    </>
  );
}
