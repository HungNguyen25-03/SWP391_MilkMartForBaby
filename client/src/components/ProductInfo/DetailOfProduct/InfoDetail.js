import React from 'react'
import './InfoDetail.scss'

export default function InfoDetail({ dataProduct }) {

    const obj = dataProduct[0]
    console.log(obj)


    return (
        <>
            <h3>Detail Of Product:</h3>
            <div className='table_info'>
                <table>
                    <tr>
                        <th>Brand</th>
                        <td>{obj.brand}</td>
                    </tr>
                    <tr>
                        <th>Ogrigin</th>
                        <td>{obj.origin}</td>
                    </tr>
                    <tr>
                        <th>Country</th>
                        <td>{obj.country}</td>
                    </tr>
                    <tr>
                        <th>Wieght</th>
                        <td>{obj.wieght}</td>
                    </tr>
                    <tr>
                        <th>Producer</th>
                        <td>{obj.producer}</td>
                    </tr>
                    <tr>
                        <th>User manual</th>
                        <td>{obj.use}</td>
                    </tr>
                    <tr>
                        <th>Storage instructions</th>
                        <td>{obj.ins}</td>
                    </tr>
                </table>
            </div>
        </>
    )
}
