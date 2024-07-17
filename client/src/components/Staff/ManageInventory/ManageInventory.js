// import React, { useEffect, useState } from "react";
// import "./Inventory.scss";
// import { BsJournalCheck } from "react-icons/bs";
// import { MdDeleteOutline } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MainAPI } from "../../API";
// import { useNavigate } from "react-router-dom";
// import DataTable from "react-data-table-component";

// export default function ManageInventory() {
//   const [inventory, setInventory] = useState([]);
//   const nav = useNavigate();

//   const fetchData = () => {
//     fetch(`${MainAPI}/staff/product`, {
//       method: "GET",
//       headers: {
//         "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch data get product");
//         return res.json();
//       })
//       .then((data) => setInventory(data))
//       .catch((error) => console.error("Error fetching data product:", error));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleEditProductClick = (product) => {
//     nav(`/edit-product/${product.product_id}`);
//   };

//   const handleDelete = async (productId) => {
//     try {
//       const data = await fetch(`${MainAPI}/staff/export/${productId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
//         },
//       }).then((response) => response.json());

//       if (data.status === 200) {
//         toast.success("Product deleted successfully");
//         fetchData();
//       } else {
//         toast.error(data.errors[0].message);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const columns = [
//     {
//       name: "Product ID",
//       selector: (row) => row.product_id,
//       sortable: true,
//     },
//     {
//       name: "Brand Name",
//       selector: (row) => row.brand_name,
//       sortable: true,
//       wrap: true,
//     },
//     {
//       name: "Image",
//       cell: (row) => <img src={row.image_url} alt="Product" style={{ width: '50px', height: '50px' }} />,
//     },
//     {
//       name: "Product Name",
//       selector: (row) => row.product_name,
//       sortable: true,
//       wrap: true,
//     },
//     {
//       name: "Price",
//       selector: (row) => row.price,
//       sortable: true,
//     },
//     {
//       name: "Country ID",
//       selector: (row) => row.country_id,
//       sortable: true,
//     },
//     {
//       name: "Description",
//       selector: (row) => row.description,
//       sortable: true,
//       wrap: true,
//     },
//     {
//       name: "Age Range",
//       selector: (row) => row.age_range,
//       sortable: true,
//     },
//     {
//       name: "Stock",
//       selector: (row) => row.stock,
//       sortable: true,
//     },
//     {
//       cell: (row) => (
//         <div className="action" style={{ display: 'flex' }}>
//           <button className="icon_btn" onClick={() => handleEditProductClick(row)}>
//             <BsJournalCheck color="green" />
//           </button>
//           <button className="icon_btn" onClick={() => handleDelete(row.product_id)}>
//             <MdDeleteOutline color="red" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <ToastContainer />
//       <div className="manage-inventory-container">
//         <button
//           className="btn btn-primary"
//           onClick={() => {
//             nav("/create-product");
//           }}
//         >
//           Add Product
//         </button>
//         <div className="table-post">
//           <DataTable
//             columns={columns}
//             data={inventory}
//             pagination
//             paginationRowsPerPageOptions={[8]}
//             className="table-content"
//           />
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import "./Inventory.scss";
import { BsJournalCheck } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainAPI } from "../../API";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

export default function ManageInventory() {
  const [inventory, setInventory] = useState([]);
  const nav = useNavigate();

  const fetchData = () => {
    fetch(`${MainAPI}/staff/product`, {
      method: "GET",
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data get product");
        return res.json();
      })
      .then((data) => setInventory(data))
      .catch((error) => console.error("Error fetching data product:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditProductClick = (product) => {
    nav(`/edit-product/${product.product_id}`);
  };

  const handleDelete = async (productId) => {
    try {
      const data = await fetch(`${MainAPI}/staff/export/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      }).then((response) => response.json());

      if (data.status === 200) {
        toast.success("Product deleted successfully");
        fetchData();
      } else {
        toast.error(data.errors[0].message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      name: "Product ID",
      selector: (row) => row.product_id,
      sortable: true,
      center: true,
      style: {
        fontSize: '12px', textAlign: 'center'
      },
    },
    {
      name: "Brand Name",
      selector: (row) => row.brand_name,
      sortable: true,
      center: true,
      wrap: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Image",
      cell: (row) => <img src={row.image_url} alt="Product" style={{ width: '30px', height: '30px' }} />,
      center: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
      center: true,
      wrap: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      center: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Country ID",
      selector: (row) => row.country_id,
      sortable: true,
      center: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      center: true,
      wrap: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Age Range",
      selector: (row) => row.age_range,
      sortable: true,
      center: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
      center: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      cell: (row) => (
        <div className="action">
          <button className="icon_btn" onClick={() => handleEditProductClick(row)}>
            <BsJournalCheck color="green" />
          </button>
          <button className="icon_btn" onClick={() => handleDelete(row.product_id)}>
            <MdDeleteOutline color="red" />
          </button>
        </div>
      ),
      center: true,
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="manage-inventory-container">
        <button
          className="btn btn-primary"
          onClick={() => {
            nav("/create-product");
          }}
        >
          Add Product
        </button>
        <div className="table-post">
          <DataTable
            columns={columns}
            data={inventory}
            pagination
            paginationRowsPerPageOptions={[2]}
            className="table-content"
          />
        </div>
      </div>
    </>
  );
}
