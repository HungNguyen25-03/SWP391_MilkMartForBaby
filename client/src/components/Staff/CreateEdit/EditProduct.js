import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MainAPI } from '../../API';

export default function EditProduct() {
    const { id } = useParams();
    const nav = useNavigate();
    const [edit, setEdit] = useState({})

    const formik = useFormik({
        initialValues: {
            brandID: "",
            image: "",
            prouductName: "",
            price: "",
            countryID: "",
            description: "",
            ageRange: "",
        },
        onSubmit: (values) => {
            handleUpdateProduct(values);
        },
        validationSchema: Yup.object({
            proName: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            prodes: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            price: Yup.number().required("Required."),
            stock: Yup.number().required("Required."),
            brandname: Yup.string().required("Required."),
            country: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            // img: Yup.string().required("Required.").matches(urlRegex, "Invalid URL"),
        }),
    });

    const fetchData = async () => {
        try {
            const response = await fetch(
                `${MainAPI}/product/getProById/${id}`,
                {
                    method: "GET",
                    headers: {
                        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
                    }
                }
            );
            if (!response.ok) throw new Error("Failed to get data to edit");
            const data = await response.json();
            const product = data.product;
            setEdit(product);
            // formik.setValues({
            //     brandID: product.brandID,
            //     image: product.image_url,
            //     prouductName: product.prouductName,
            //     price: product.price,
            //     countryID: product.countryID,
            //     description: product.description,
            //     ageRange: product.ageRange,
            // });
        } catch (error) {
            console.log("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(edit);

    const handleUpdateProduct = async () => {
        try {
            const response = await fetch(`${MainAPI}/staff/update-product/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({
                    brandID: formik.values.brandID,
                    image: formik.values.image,
                    prouductName: formik.values.prouductName,
                    price: formik.values.price,
                    countryID: formik.values.countryID,
                    description: formik.values.description,
                    ageRange: formik.values.ageRange,
                }),
            });
            if (!response.ok) throw new Error("Failed to update product");
            const data = await response.json();
            console.log(data);
            toast.success("Product updated successfully");
            setTimeout(() => {
                nav("/staff/manage_inventory");
            }, 2000);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleCancel = () => {
        nav("/staff/manage_inventory");
    }

    return (
        <div className="container mt-3">
            <ToastContainer />
            <div className="mx-2">
                <div className="card edit-voucher">
                    <div className="card-body">
                        <h4 className="card-title">Edit Product</h4>
                        <form onSubmit={formik.handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="img" className="form-label">Url_Image</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                                    id="image"
                                    name="image"
                                    value={formik.values.image}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.image && formik.errors.image && (
                                    <div className="invalid-feedback">
                                        {formik.errors.image}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Brand ID</label>
                                {/* <input
                                    type="text"
                                    className={`form-control ${formik.touched.productID && formik.errors.productID ? 'is-invalid' : ''}`}
                                    id="proName"
                                    name="proName"
                                    value={formik.values.productID}
                                    onChange={formik.handleChange}
                                /> */}
                                <select
                                    className={`form-control ${formik.touched.ageRange && formik.errors.ageRange ? 'is-invalid' : ''}`}
                                    id="range"
                                    name="range"
                                    value={formik.values.ageRange}
                                    onChange={formik.handleChange}
                                >
                                    <option value="> 2 years old">&gt; 2 years old</option>
                                    <option value="0-1 year">0-1 year</option>
                                    <option value="1-2 years">1-2 years</option>
                                    <option value="Adult">Adult</option>
                                    <option value="Maternal">Maternal</option>
                                </select>
                                {formik.touched.proName && formik.errors.proName && (
                                    <div className="invalid-feedback">
                                        {formik.errors.proName}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="prodes" className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.prouductName && formik.errors.prouductName ? 'is-invalid' : ''}`}
                                    id="prouductName"
                                    name="prouductName"
                                    value={formik.values.prouductName}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.prouductName && formik.errors.prouductName && (
                                    <div className="invalid-feedback">
                                        {formik.errors.prouductName}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    className={`form-control ${formik.touched.price && formik.errors.price ? 'is-invalid' : ''}`}
                                    id="price"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.price && formik.errors.price && (
                                    <div className="invalid-feedback">
                                        {formik.errors.price}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country Name</label>
                                <select
                                    className={`form-control ${formik.touched.countryID && formik.errors.countryID ? 'is-invalid' : ''}`}
                                    id="countryID"
                                    name="countryID"
                                    value={formik.values.countryID}
                                    onChange={formik.handleChange}
                                >
                                    <option value="VNA">VietNam</option>
                                    <option value="NED">Netherlands</option>
                                    <option value="KOR">Korea</option>
                                    <option value="SWE">Swedden</option>
                                    <option value="JPN">Janpan</option>
                                    <option value="THL">Thailand</option>
                                    <option value="AUS">Austria</option>
                                    <option value="USA">America</option>
                                    <option value="GER">Germany</option>
                                    <option value="CAN">Canada</option>
                                    <option value="FRA">France</option>
                                    <option value="IRE">Ireland</option>
                                </select>
                                {formik.touched.countryID && formik.errors.countryID && (
                                    <div className="invalid-feedback">
                                        {formik.errors.countryID}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="range" className="form-label">Age Range</label>
                                <select
                                    className={`form-control ${formik.touched.ageRange && formik.errors.ageRange ? 'is-invalid' : ''}`}
                                    id="range"
                                    name="range"
                                    value={formik.values.ageRange}
                                    onChange={formik.handleChange}
                                >
                                    <option value="> 2 years old">&gt; 2 years old</option>
                                    <option value="0-1 year">0-1 year</option>
                                    <option value="1-2 years">1-2 years</option>
                                    <option value="Adult">Adult</option>
                                    <option value="Maternal">Maternal</option>
                                </select>
                                {formik.touched.ageRange && formik.errors.ageRange && (
                                    <div className="invalid-feedback">
                                        {formik.errors.ageRange}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="prodes" className="form-label">Description</label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className="invalid-feedback">
                                        {formik.errors.description}
                                    </div>
                                )}
                            </div>

                            <div className="mt-3">
                                <button type="submit" className="btn btn-primary me-2">
                                    Update
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => handleCancel()}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

