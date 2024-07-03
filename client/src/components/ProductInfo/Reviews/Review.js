import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MainAPI } from '../../API';

export default function Review() {

    const { id } = useParams()

    console.log(id)

    const [dataConfirm, setDataConfirm] = useState([]);

    const fetchData = () => {
        fetch(`${MainAPI}/user/show-reviews-by-product/${id}`, {
            method: "GET",
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch data get order");
                return response.json();
            })
            .then(data => setDataConfirm(data))
            .catch(error => console.error("Error fetching data order:", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(dataConfirm.reviews)
    return (
        <>
            {/* {
                reviews.length === 0 ? (
                    <div>No reviews available</div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id}>
                            <p>{review.content}</p>
                        </div>
                    ))
                )
            } */}
        </>
    );

}
