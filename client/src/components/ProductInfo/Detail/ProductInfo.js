import React, { useContext, useState } from "react";
import "./Productinfo.scss";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CartContext } from "../../Cart/CartContext";

export default function ProductInfo({ product }) {
  const { handleAddToCart, decrementQuantity, incrementQuantity } =
    useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDescreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

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
          <div className="milk_name">
            <h3>{product.product_name}</h3>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="ptc">
                <img src={product.image_url} />
              </div>
            </div>

            <div className="col-md-6 info">
              <div className="brand">
                Brand:&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "pink" }}>{product.brand}</span>
              </div>

              <div className="name">
                Name Of Product:&nbsp;&nbsp;&nbsp;{product.product_name}
              </div>

              <div className="feed_rate">
                Rating: &nbsp;&nbsp;{product.rate}&nbsp;
                <span style={{ color: "orange" }}>★</span>&nbsp;&nbsp;&nbsp;
                <span>||</span>&nbsp;&nbsp;&nbsp; FeedBack: &nbsp;&nbsp;
                {product.feed}
              </div>

              <div className="price">
                Price:&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{product.price}</span>
              </div>

              <div className="quantity">
                Quantity:&nbsp;&nbsp;
                <button
                  className="btn"
                  onClick={() => {
                    decrementQuantity(product);
                  }}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="btn"
                  onClick={() => {
                    incrementQuantity(product);
                  }}
                >
                  +
                </button>
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
                <span>
                  <button className="btn_buy">Buy</button>
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
        <span>({product.like})</span>
      </div>
    </>
  );
}
