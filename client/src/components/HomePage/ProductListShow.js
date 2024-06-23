import { useContext, useEffect, useState } from "react";
import { categoryList } from "./category";
import "./Product.scss";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../Cart/CartContext";
import { formatVND } from "../../utils/Format";
import { ageList } from "./category";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductListShow({ productList }) {
  const { handleAddToCart } = useContext(CartContext);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(productList);

  const handleFilterButtonClick = (seletedCategory) => {
    if (selectedFilters.includes(seletedCategory)) {
      setSelectedFilters(
        selectedFilters.filter((category) => category !== seletedCategory)
      );
    } else {
      setSelectedFilters([...selectedFilters, seletedCategory]);
    }
  };

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((seletedCategory) => {
        let temp = productList.filter(
          (product) => product.category === seletedCategory
        );
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...productList]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  //   console.log(selectedFilters);

  return (
    <div className="fillter_container">
      <ToastContainer />
      <div className="type">
        <div className="category">
          <p className="m-0">Loại Sữa:</p>
          <div style={{ marginLeft: "25px" }}>
            {categoryList.map((cate, index) => (
              <div className="cate" key={cate.id}>
                <button
                  onClick={() => {
                    handleFilterButtonClick(cate.title);
                  }}
                  className={`btn ${
                    selectedFilters?.includes(cate.title) ? "active" : ""
                  }`}
                  key={`filters-${index}`}
                >
                  {cate.title}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="category">
          <p className="m-0">Độ tuổi:</p>
          <div style={{ marginLeft: "25px" }}>
            {ageList.map((age, index) => (
              <div className="cate" key={age.id}>
                <button
                  onClick={() => {
                    handleFilterButtonClick(age.title);
                  }}
                  className={`btn ${
                    selectedFilters?.includes(age.title) ? "active" : ""
                  }`}
                  key={`filters-${index}`}
                >
                  {age.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="product_detail text-center">
        <div className="row row-cols-5">
          {productList.map((product) => (
            <div key={product.product_id} className="product-card col">
              <a
                className="product-detail-link"
                href={`/home/ProductDetail/${product.product_id}`}
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
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  justifyContent: "space-around",
                }}
              >
                <div>{formatVND(product.price)}</div>
                <div
                  className="icon_cart"
                  onClick={() => handleAddToCart(product)}
                >
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
