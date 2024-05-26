import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ProductInfo from "./Detail/ProductInfo";
import HeaderProductDetail from "./Header/HeaderProductDetail";
import FooterProductDetail from "./Footer/FooterProductDetail";

export default function ProductDetail() {

  const { id } = useParams()

  const [product, setProduct] = useState();

  useEffect(() => {
    fetch(`http://127.0.0.1:1880/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);


  return (
    <div>
      <HeaderProductDetail />
      {product && <ProductInfo product={product} />}
      <FooterProductDetail />
    </div>
  )
}
