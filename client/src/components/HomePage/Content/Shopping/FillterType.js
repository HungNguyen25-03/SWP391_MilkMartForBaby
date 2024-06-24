import { useEffect, useState } from "react";
import { productList } from "./Product";
import axios from "axios";
import { MainAPI } from "../../../API";
import ProductListShow from "../../ProductListShow";

export default function FillterType() {
  const [allProductList, setAllProductList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .post(`${MainAPI}/product/getProduct`, {
        page: page,
        pageSize: 12,
      })
      .then((res) => {
        // console.log(res.data.inStockProducts);
        setAllProductList(res.data.inStockProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, setPage]);

  console.log(page);

  return (
    <ProductListShow
      productList={allProductList}
      changePage={(page) => {
        setPage(page);
      }}
    />
  );
}
