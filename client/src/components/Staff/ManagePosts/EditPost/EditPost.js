import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { MainAPI } from "../../../API";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ENDPOINT = "staff/uploads";

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const fd = new FormData();
        loader.file.then((file) => {
          // here check the mimetype and send request
          // to relevant backend api endpoint
          fd.append("uploads", file);
          fetch(`${MainAPI}/${ENDPOINT}`, {
            method: "POST",
            body: fd,
          })
            .then((res) => res.json())
            .then((res) => {
              resolve({ default: `${MainAPI}/${res.url}` });
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    },
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

export default function EditPost() {
  const { id } = useParams();
  const { auth } = useAuth();
  const nav = useNavigate();
  const [post, setPost] = useState({
    post_id: "",
    title: "",
    description: "",
    image_url: "",
    post_date: "",
  });

  useEffect(() => {
    axios
      .get(`${MainAPI}/user/get-post/${id}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditPost = () => {
    axios
      .put(`${MainAPI}/staff/update-post/${id}`, post, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setTimeout(() => {
          nav("/staff/manage_posts");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(post);

  return (
    <div className="create-post-container">
      <ToastContainer />
      <div className="create-post-content">
        <h2 className="mb-3 mt-3">Edit Post</h2>
        <form class="row g-3">
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="Post title"
              name="title"
              value={post.title}
              onChange={(e) => {
                setPost({ ...post, title: e.target.value });
              }}
            />
          </div>
          <div class="mb-3">
            <input
              class="form-control"
              placeholder="Thumbnail Image URL"
              name="image_url"
              value={post.image_url}
              onChange={(e) => {
                setPost({ ...post, image_url: e.target.value });
              }}
            ></input>
          </div>
        </form>
        <CKEditor
          config={{
            extraPlugins: [uploadPlugin],
          }}
          editor={ClassicEditor}
          data={post.description}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setPost({ ...post, description: data });
            // console.log(data);
          }}
          onBlur={(event, editor) => {
            // console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
          }}
        />
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary" onClick={handleEditPost}>
          Submit
        </button>
      </div>
    </div>
  );
}
