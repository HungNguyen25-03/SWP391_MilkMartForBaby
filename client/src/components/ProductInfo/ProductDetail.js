import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "./Detail/ProductInfo";
import InfoDetail from "./DetailOfProduct/InfoDetail";
import HeaderPage from "../../utils/Header/Header";
import Rate from "./Rate/Rate";
import FooterPage from "../../utils/Footer/FooterPage";
import axios from "axios";
import { MainAPI } from "../API";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [dataProduct, setDataProduct] = useState();
  const [cus, setCus] = useState();

  useEffect(() => {
    axios
      .get(`${MainAPI}/product/getProById/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <HeaderPage />
      {product && <ProductInfo product={product} />}
      {dataProduct && <InfoDetail dataProduct={dataProduct} />}
      {cus && <Rate cus={cus} />}
      <FooterPage />
    </div>
  );
}
