import { useContext, useEffect, useState } from "react";
import { categoryList, ageList } from "./category";
import "./Product.scss";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../Cart/CartContext";
import { formatVND } from "../../utils/Format";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MainAPI } from "../API";
import { Link } from "react-router-dom";

export default function ProductListShow({ productList, changePage }) {
  const { handleAddToCart } = useContext(CartContext);
  const [ageFilters, setAgeFilters] = useState([]);
  const [countryFilters, setCountryFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(productList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleFilterButtonClick = (
    selectedCategory,
    selectedFilters,
    setSelectedFilters
  ) => {
    if (selectedFilters.includes(selectedCategory)) {
      setSelectedFilters(
        selectedFilters.filter((category) => category !== selectedCategory)
      );
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  const filterItems = () => {
    axios
      .post(`${MainAPI}/product/filter`, {
        country: countryFilters,
        ageRange: ageFilters,
      })
      .then((res) => {
        setFilteredItems(res.data.products);
        setCurrentPage(1); // Reset to the first page when filters are applied
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (countryFilters.length > 0 || ageFilters.length > 0) {
      filterItems();
    } else {
      setFilteredItems(productList);
    }
  }, [countryFilters, ageFilters, productList]);

  useEffect(() => {
    setFilteredItems(productList);
  }, [productList]);

  console.log(productList);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    changePage(pageNumber);
  };

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
                    handleFilterButtonClick(
                      cate.country,
                      countryFilters,
                      setCountryFilters
                    );
                  }}
                  className={`btn ${
                    countryFilters?.includes(cate.country) ? "active" : ""
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
                    handleFilterButtonClick(
                      age.title,
                      ageFilters,
                      setAgeFilters
                    );
                  }}
                  className={`btn ${
                    ageFilters?.includes(age.title) ? "active" : ""
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

      <div className="product_detail text-center d-flex flex-column">
        <div className="row row-cols-5">
          {currentItems &&
            productList.map((product) => (
              <div key={product.product_id} className="product-card col">
                <Link
                  className="product-detail-link"
                  to={`/home/ProductDetail/${product.product_id}`}
                >
                  <div className="home-product-detail-img-container">
                    <img src={product.image_url} alt={product.title} />
                  </div>
                  <div className="mt-2">{product.product_name}</div>
                  <div>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span style={{ fontSize: "10px" }}>{product.sale}</span>
                  </div>
                </Link>
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
        <div className="pagination">
          {Array.from({ length: 3 }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-button ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
