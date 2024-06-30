import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { MainAPI } from "../../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";

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

export default function ManagePosts() {
  const [description, setDescription] = useState("");
  console.log(description);
  const { auth } = useAuth();

  const handleCreatePost = () => {
    axios
      .post(`${MainAPI}/staff/create-post`, { description: description, user_id: auth.user.user_id })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="App">
        <ToastContainer autoClose={2000} />
        <h2>Manage Post</h2>
        <CKEditor
          config={{
            extraPlugins: [uploadPlugin],
          }}
          editor={ClassicEditor}
          data="<p>Hello from CKEditor&nbsp;5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDescription(data);
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
        <button className="btn btn-primary " onClick={handleCreatePost}>
          Submit
        </button>
      </div>
      {/* <div>
                <div
                    className="editor"
                    dangerouslySetInnerHTML={{ __html: description }}
                ></div>
            </div> */}
    </>
  );
}
