import { useEffect, useState } from "react";
import { productList } from "./Product";
import axios from "axios";
import { MainAPI } from "../../../API";
import ProductListShow from "../../ProductListShow";

export default function FillterType() {
  const [allProductList, setAllProductList] = useState([]);

  useEffect(() => {
    axios
      .get(`${MainAPI}/product/getProduct`)
      .then((res) => {
        setAllProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <ProductListShow productList={productList} />;
}
