import React, { useEffect, useState } from "react";
import HeaderPage from "../../../utils/Header/Header";
import FooterPage from "../../../utils/Footer/FooterPage";
import axios from "axios";
import { MainAPI } from "../../API";
import { useLocation } from "react-router-dom";
import ProductListShow from "../ProductListShow";
import { productList } from "../Content/Shopping/Product";

export default function SearchPage() {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const searchTerm = new URLSearchParams(location.search).get("search_query");

  useEffect(() => {
    axios
      .get(`${MainAPI}/product/search?searchTerm=${searchTerm}`)
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
        // nav("/search", { searchResult: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);

  return (
    <div>
      <HeaderPage />
      <div className="container">
        {searchResult.length === 0 ? (
          <>
            <div className="emptyinfo" style={{ marginTop: "80px" }}>
              <img src="https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsearch-empty.png?alt=media&token=478bd46a-1d79-47f3-bcab-898248bc04d5" />
              <p>Chưa tìm thấy kết quả phù hợp</p>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div style={{ marginTop: "80px" }}>
              <ProductListShow productList={searchResult} />
            </div>
          </>
        )}
      </div>
      <FooterPage />
    </div>
  );
}
