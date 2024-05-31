import React from 'react'
import './InfoDetail.scss'

export default function InfoDetail({ dataProduct }) {
    return (
        <>
            <h3>Detail Of Product:</h3>
            <div className='table_info'>
                <table>
                    <tbody>
                        <tr>
                            <td className='th'>Brand</td>
                            <td>{dataProduct.brand}</td>
                        </tr>
                        <tr>
                            <td className='th'>Ogrigin</td>
                            <td>{dataProduct.origin}</td>
                        </tr>
                        <tr>
                            <td className='th'>Country</td>
                            <td>{dataProduct.country}</td>
                        </tr>
                        <tr>
                            <td className='th'>Wieght</td>
                            <td>{dataProduct.wieght}</td>
                        </tr>
                        <tr>
                            <td className='th'>Producer</td>
                            <td>{dataProduct.producer}</td>
                        </tr>
                        <tr>
                            <td className='th'>User manual</td>
                            <td>{dataProduct.use}</td>
                        </tr>
                        <tr>
                            <td className='th'>Storage instructions</td>
                            <td>{dataProduct.ins}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
