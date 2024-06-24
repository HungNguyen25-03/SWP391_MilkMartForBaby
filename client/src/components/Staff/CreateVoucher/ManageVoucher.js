import React, { useEffect, useState } from 'react';
import './Voucher.scss';
import { MainAPI } from '../../API';

export default function ManageVoucher() {
    const [vouchers, setVouchers] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');

    const fetchData = async () => {
        try {
            const res = await fetch(`${MainAPI}/staff/voucher`, {
                method: "GET",
            });

            if (!res.ok) throw new Error("Failed to fetch data get voucher");

            const data = await res.json();
            setVouchers(data);

        } catch (error) {
            console.error("Error fetching data voucher:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddVoucher = async () => {
        try {
            const res = await fetch(`${MainAPI}/staff/createVoucher`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: code,
                    discount: discount,
                }),
            });

            if (!res.ok) throw new Error("Failed to add voucher");

            fetchData()
            setShowAdd(false);

            setCode('');
            setDiscount('');
            console.log('dã thêm')

        } catch (error) {
            console.error("Error adding voucher:", error);
        }
    }

    return (
        <div className='voucher'>
            <div className="create-voucher-btn">
                <button
                    style={{ border: 'none', borderRadius: '20px', marginRight: '20px', marginTop: '20px', backgroundColor: '#00CCFF' }}
                    onClick={() => setShowAdd(true)}>
                    Create Voucher
                </button>
            </div>
            {showAdd && (
                <div className="add-voucher" style={{ marginLeft: '10px' }}>
                    <div className="add-voucvher-detail">
                        <h4>Create Voucher</h4>
                        <label>Code:</label>
                        <input type="text" value={code} onChange={(event) => setCode(event.target.value)} />
                        <label className='code-dis' >Discount (%):</label>
                        <input type="number" value={discount} onChange={(event) => setDiscount(event.target.value)} />
                        <button className='add-cancel' onClick={handleAddVoucher}>Create</button>
                        <button className='add-cancel' onClick={() => setShowAdd(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className='voucher-th'>
                <table className='table-voucher-th'>
                    <thead>
                        <tr>
                            <th>Voucher ID</th>
                            <th>Code</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className='voucher-tb'>
                <table className='table-voucher-tb'>
                    <tbody>
                        {vouchers.map((voucher, index) => (
                            <tr key={index}>
                                <td>{voucher.voucher_id}</td>
                                <td>{voucher.code}</td>
                                <td>{voucher.discount}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
