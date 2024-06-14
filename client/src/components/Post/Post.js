import React, { useEffect, useState } from "react";
import "./Post.scss";
import HeaderPage from "../../utils/Header/Header";
import FooterPage from "../../utils/Footer/FooterPage";
import { useParams } from "react-router-dom";

const useFind = ({ list, id }) => {
  return list.find((item) => item.id === id);
};

export default function Post() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:1880/blogs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBlog(data);
      });
  }, []);

  const post = useFind({ list: blog, id: id });

  return (
    <div style={{ "background-color": "#f5f7fd" }}>
      <HeaderPage />
      <div className="container">
        <div className="post-container">
          <h1>{post?.title}</h1>
          <p>{post?.content}</p>
          <div className="post-image d-flex justify-content-center align-items-center">
            <img src={post?.image} alt={post?.title} />
          </div>
          <div className="post-content">
            <p>{post?.posted_date}</p>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}
