import React, { useEffect, useState } from "react";
import "./Post.scss";
import HeaderPage from "../../utils/Header/Header";
import FooterPage from "../../utils/Footer/FooterPage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MainAPI } from "../API";

const useFind = ({ list, id }) => {
  return list.find((item) => item.id === id);
};

export default function Post() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios.get(`${MainAPI}/user/get-post/${id}`).then((res) => {
      setBlog(res.data);

    })
  }, []);

  console.log(blog)


  return (
    <div style={{ "background-color": "#f5f7fd" }}>
      <HeaderPage />
      <div className="container">
        <div className="post-container">
          <div
            className="editor"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}
