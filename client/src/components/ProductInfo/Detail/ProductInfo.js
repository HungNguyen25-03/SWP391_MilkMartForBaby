import React, { useState } from 'react'
import './Productinfo.scss'


export default function ProductInfo({ product }) {

    const object = product[0]

    const [quantity, setQuantity] = useState(1)

    const handleIncreaseQuantity = () => {
        if (quantity < object.stock) {
            setQuantity(quantity + 1)
        }
    }

    const handleDescreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <>
            {product.map((pro) => {
                return (
                    <div key={pro.id} className='productInfo_container'>

                        <div className='ptc'>
                            <div className='ptc_main'> <img src={`assest/images/logo/${pro.img}.png`} /> </div>
                            <div className='ptc_sub'> <img src={`assest/images/logo/${pro.img}.png`} /> </div>
                        </div>

                        <div className='info'>
                            <div className='brand'>Band:&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'pink' }}>{pro.brand}</span></div>
                            <div className='name'>Name Of Product:&nbsp;&nbsp;&nbsp;{pro.title}</div>
                            <div className='feed_rate'>
                                Rating: &nbsp;&nbsp;{pro.rate}&nbsp;
                                <span style={{ color: 'orange' }}>★</span>&nbsp;&nbsp;&nbsp;
                                <span>||</span>&nbsp;&nbsp;&nbsp;
                                FeedBack: &nbsp;&nbsp;{pro.feed}
                            </div>
                            <div className='price'>Price:&nbsp;&nbsp;&nbsp;<span style={{ color: 'red' }}>{pro.price}</span></div>
                            <div className='quantity'>
                                Quantity:&nbsp;&nbsp;
                                <button className='btn' onClick={handleDescreaseQuantity}>-</button>
                                <span>{quantity}</span>
                                <button className='btn' onClick={handleIncreaseQuantity}>+</button>
                            </div>
                        </div>

                    </div>
                );
            })}
        </>
    )
}
