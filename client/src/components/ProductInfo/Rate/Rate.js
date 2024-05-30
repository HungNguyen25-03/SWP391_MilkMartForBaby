import React from 'react'
import './Rate.scss'

export default function Rate({ cus }) {

    return (
        <>
            <h3>Rating Of Customer</h3>
            <div className='rate'>
                <div className='rate_image'>
                    <img src='assest/images/avatar/cusava.png' />
                </div>
                <div className='cus'>
                    <div>{cus.name}</div>
                    <div className='star_date'>
                        <div className="star">★&nbsp;★&nbsp;★&nbsp;★&nbsp;★</div>
                        <div className='date'>{cus.date}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
