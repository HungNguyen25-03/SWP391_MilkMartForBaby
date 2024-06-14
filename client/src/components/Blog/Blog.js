import React, { useEffect, useState } from "react";
import "./Blog.scss";
import HeaderPage from "../../utils/Header/Header";
import FooterPage from "../../utils/Footer/FooterPage";
import { Link } from "react-router-dom";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:1880/blogs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
      });
  }, []);

  return (
    <div style={{ "background-color": "#f5f7fd" }}>
      <HeaderPage />
      <div className="container blog-container">
        {blogs.map((blog) => {
          return (
            <div className="col-md-4 p-3">
              <Link to={`post/${blog.id}`} className="link">
                <div className="card content-card" key={blog.id}>
                  <div className="img-container mb-3">
                    <img src={blog.image} alt={blog.id} />
                  </div>
                  <div className="content-container">
                    <h4>{blog.title}</h4>
                    <div className="blog-content">{blog.content}</div>
                    <div className="text-end mt-3 ">
                      <p className="fs-6">{blog.posted_date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <FooterPage />
    </div>
  );
}
