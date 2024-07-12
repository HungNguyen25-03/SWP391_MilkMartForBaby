import React, { useEffect, useState } from 'react'
import './Report.scss'
import { MainAPI } from '../../API';
import { convertSQLDate } from '../../../utils/Format';

export default function Report() {

    const [reports, setReport] = useState([])

    const fetchData = () => {
        fetch(`${MainAPI}/staff/show-all-report`, {
            method: "GET",
            headers: { "x-access-token": JSON.parse(localStorage.getItem("accessToken")) }
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch data get report");
                return res.json();
            })
            .then(data => setReport(data))
            .catch(error => console.error("Error fetching data report:", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(reports)

    return (
        <div className='report'>
            <div className='report-th'>
                <table className='table-report-th'>
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>User Name</th>
                            <th>Product Name</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className='report-tb'>
                <table className='table-report-tb'>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.report_id}>
                                <td>{report.report_id}</td>
                                <td>{convertSQLDate(report.report_date)}</td>
                                <td>{report.report_description}</td>
                                <td>{report.username}</td>
                                <td>{report.product_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
