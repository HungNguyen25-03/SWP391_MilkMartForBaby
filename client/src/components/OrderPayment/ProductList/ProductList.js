import React from "react";
import { ListOfProduct } from "../../Cart/ListOfProduct";

const ProductList = () => {
  return (
    <div className="product-list">
      {ListOfProduct.map((product) => {
        return (
          <div className="product-item d-flex justify-content-between align-items-center">
            <div className="product-info d-flex align-items-center">
              <img
                src={product.image}
                alt="Herbs of Gold Pregnancy Plus 1-2-3"
              />
              <div className="product-details">
                <div>{product.name}</div>
              </div>
            </div>
            <div className="product-quantity">x{product.quantity}</div>
            <div className="product-price">{product.price}₫</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
