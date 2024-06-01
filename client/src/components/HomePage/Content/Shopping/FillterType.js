import { useState } from "react";
import { categoryList } from "./category";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { productList } from "./Product";
import "./Product.scss";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FillterType() {
  const [checkbox, setcheckbox] = useState(false);

  const showcheckbox = (item) => {
    setcheckbox(!checkbox);
    let currList = [...categoryList];
    let getProduct = currList.filter((product) => {
      return product.id === item.id;
    });
    console.log(getProduct);
  };

  return (
    <div className="fillter_container">
      <div className="type">
        <h3>Loại Sữa</h3>
        <div className="category">
          {categoryList.map((cate) => {
            return (
              <div className="cate" key={cate.id}>
                <span onClick={showcheckbox}>
                  {" "}
                  {checkbox === true ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )}
                </span>
                &nbsp;{cate.title}
              </div>
            );
          })}
        </div>
      </div>

      <div className="product_detail">
        {productList.map((product) => {
          return (
            <Link
              to={`/home/ProductDetail/${product.id}`}
              className="product"
              key={product.id}
            >
              <div>
                <img src={product.img} />
              </div>
              <div>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <></>
                {product.sale}
              </div>
              <div>
                {product.price} <FaShoppingCart />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
