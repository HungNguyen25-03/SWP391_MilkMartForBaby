import React, { useState } from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const API = "http://localhost:4000/staff";
const ENDPOINT = "uploads";

function uploadAdapter(loader) {
    return {
        upload: () => {
            return new Promise((resolve, reject) => {
                const fd = new FormData();
                loader.file.then((file) => {
                    // here check the mimetype and send request
                    // to relevant backend api endpoint
                    fd.append("uploads", file);
                    fetch(`${API}/${ENDPOINT}`, {
                        method: "POST",
                        body: fd,
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            resolve({ default: `${API}/${ENDPOINT}/${res.url}` });
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

    return (
        <>
            <div className="App">
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
                        console.log(data);
                    }}
                    onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                    }}
                />
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
