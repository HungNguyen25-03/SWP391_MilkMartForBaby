import { useContext, useState } from "react";
import { categoryList } from "./category";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { productList } from "./Product";
import "./Product.scss";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../../Cart/CartContext";

export default function FillterType() {

  const { handleAddToCart } = useContext(CartContext)

  const [checkbox, setCheckbox] = useState(false);


  const showCheckbox = (item) => {
    setCheckbox(!checkbox);
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
          <p className="m-0">Loại Sữa:</p>
          <div style={{ marginLeft: '25px' }}>
            {categoryList.map((cate) => (
              <div className="cate" key={cate.id}>
                <span onClick={() => showCheckbox(cate)}>
                  {checkbox === true ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                </span>
                &nbsp;{cate.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="product_detail text-center">
        <div className="row row-cols-5">
          {productList.map((product) => (
            <div key={product.id} className="product-card col">
              <a
                className="product-detail-link"
                href={`/home/ProductDetail/${product.id}`}
              >
                <div className="home-product-detail-img-container">
                  <img src={product.img} alt={product.title} />
                </div>
                <div className="mt-2">{product.detail}</div>
                <div>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span style={{ fontSize: "10px" }}>{product.sale}</span>
                </div>
              </a>
              <div style={{ display: 'flex', marginTop: "10px", justifyContent: 'space-around' }}>
                <div>
                  {product.price}
                </div>
                <div className="icon_cart" onClick={() => handleAddToCart(product)}>
                  <FaShoppingCart />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
