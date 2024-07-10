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
import { Link, useParams } from "react-router-dom";

export default function ProductListShow({
  productList,
  changePage,
  totalPage,
  isBrandPage,
}) {
  const { handleAddToCart } = useContext(CartContext);
  const [ageFilters, setAgeFilters] = useState([]);
  const [countryFilters, setCountryFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [productListAll, setProductListAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageAll, setTotalPageAll] = useState(0);
  const [filterPage, setFilterPage] = useState(0);
  const itemsPerPage = 12;
  const { brand_name } = useParams();
  console.log(brand_name);

  useEffect(() => {
    axios
      .get(`${MainAPI}/product/getAllProductWithoutPagination`)
      .then((res) => {
        setProductListAll(res.data.inStockProducts);
        // console.log(res.data.inStockProducts);
      })
      .catch((err) => console.log(err));
  }, []);

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

  //FILTER ITEMS // Nếu đang chưa filter mà đang ở trang 2 thì khi filter (data trả về có về 1 trang) thì sẽ bị lỗi (vì currentPage vẫn là 2)
  useEffect(() => {
    axios
      .post(`${MainAPI}/product/filter?page=${currentPage}`, {
        country: countryFilters,
        ageRange: ageFilters,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.inStockProducts) {
          setFilteredItems([
            ...res.data.inStockProducts,
            ...res.data.outOfStockProducts,
          ]);
          setFilterPage(res.data.totalPages);
          // setCurrentPage(1);
        } else {
          setFilteredItems([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ageFilters, countryFilters, currentPage]);
  // console.log(filteredItems);

  //SET TOTAL PAGE
  useEffect(() => {
    if (filteredItems.length > 0) {
      setTotalPageAll(filterPage);
    } else {
      setTotalPageAll(totalPage);
    }
  }, [totalPage, filterPage]);

  // console.log(productList);

  const totalPages = totalPageAll;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    changePage(pageNumber);
  };

  return (
    <>
      {productList.length > 0 ? (
        <>
          <div
            className={
              brand_name !== undefined ? "filterBrand" : "fillter_container"
            }
          >
            <ToastContainer autoClose={2000} />
            <>
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
                            countryFilters?.includes(cate.country)
                              ? "active"
                              : ""
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
            </>

            <div className="product_detail text-center d-flex flex-column">
              <div
                className="row row-cols-5"
                style={{ justifyContent: "center" }}
              >
                {ageFilters.length > 0 || countryFilters.length > 0 ? (
                  <>
                    {filteredItems.map((product) => (
                      <div
                        key={product.product_id}
                        className="product-card col"
                      >
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
                            <span style={{ fontSize: "10px" }}>
                              {product.sale}
                            </span>
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
                  </>
                ) : (
                  <>
                    {productList.map((product) => (
                      <div
                        key={product.product_id}
                        className="product-card col"
                      >
                        <Link
                          className={
                            product.stock <= 0
                              ? "sold-out"
                              : "product-detail-link"
                          }
                          to={`/home/ProductDetail/${product.product_id}`}
                        >
                          <div className="home-product-detail-img-container">
                            <img src={product.image_url} alt={product.title} />
                            {product.stock <= 0 && (
                              <button className="sold-out-button">
                                Sold Out
                              </button>
                            )}
                          </div>
                          <div className="mt-2">{product.product_name}</div>
                          <div>
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span style={{ fontSize: "10px" }}>
                              {product.sale}
                            </span>
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
                  </>
                )}
              </div>
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
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
        </>
      ) : (
        <>
          <div className="emptyinfo">
            <img
              style={{ marginBottom: "30px" }}
              src={
                "https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsearch-empty.png?alt=media&token=478bd46a-1d79-47f3-bcab-898248bc04d5"
              }
            />
            <p>
              Hiện chưa có đơn hàng nào <br />
              đang chờ được giao
            </p>
          </div>
        </>
      )}
    </>
  );
}
