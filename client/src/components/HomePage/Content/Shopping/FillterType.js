import React, { useState } from 'react'
import { categoryList } from './category'

export default function FillterType() {
    // const [cate, setCate] = useState([])

    const handlecheckbox = (event) => {
        let currvalue = categoryList.filter((item) => { return item.id === event.id });console.log(categoryList)
        console.log(event)
        console.log(currvalue)
    }


    return (
        <div className='fillter_container'>

            <div className='category'>
                {categoryList.map((cate) => {
                    return (
                        <div className='cate' key={cate.id}>
                            <input  id={cate.id} type='checkbox' value={cate.title} onClick={handlecheckbox} />{cate.title}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
