import React, { useEffect, useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import { productList } from "../../../../HomePage/Content/Shopping/Product";
import "./ModaReview.scss";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { MainAPI } from "../../../../API";
import { toast } from "react-toastify";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function ModalReview({ closeModal, onSubmit, product }) {
  const { auth } = useAuth();
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [feedback, setFeedback] = useState("");
  console.log(product);

  useEffect(() => {}, []);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${MainAPI}/user/review-product`,
        {
          user_id: auth.user.user_id,
          product_id: product.product_id,
          rating: currentValue,
          comment: feedback,
        },
        {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
          },
        }
      )
      .then((res) => {
        closeModal();
        toast.success("Đánh giá thành công");
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đánh giá thất bại");
      });
    onSubmit({ feedback, currentValue });
  };

  return (
    <div
      className="modal-container-review"
      onClick={(e) => {
        if (e.target.className === "modal-container-review") {
          closeModal();
        }
      }}
    >
      <div className="modal-content">
        <h3 className="text-center">Đánh giá sản phẩm</h3>
        <div className="d-flex">
          <div className="img-container">
            <img src={product.image_url} alt="product" />
          </div>
          <p>{product.product_name}</p>
        </div>

        <div className="rating d-flex justify-content-center">
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                style={{ cursor: "pointer", margin: "0 2px" }}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Hãy chia sẻ những điều ban thích về sản phẩm"
            name="feedback"
            style={{
              width: "100%",
              height: "200px",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-space-between ">
            <button className=" btn bg-secondary" onClick={closeModal}>
              Close
            </button>
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
