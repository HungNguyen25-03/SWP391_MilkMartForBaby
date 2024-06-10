import { useState } from "react";
import { categoryList } from "./category";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { productList } from "./Product";
import "./Product.scss";
import { FaShoppingCart } from "react-icons/fa";

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
        <div className="category">
          <p className="m-0">Loại Sữa</p>
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

      <div className="product_detail text-center">
        <div className="row row-cols-5">
          {productList.map((product) => {
            return (
              <div className="product-card col">
                <a
                  className="product-detail-link"
                  href={`/home/ProductDetail/${product.id}`}
                  key={product.id}
                >
                  <div className="home-product-detail-img-container">
                    <img src={product.img} />
                  </div>
                  <div className="mt-2">{product.detail}</div>
                  <div>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <></>
                    <span style={{ fontSize: "10px" }}>{product.sale}</span>
                  </div>
                  <div>
                    {product.price} <FaShoppingCart />
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
