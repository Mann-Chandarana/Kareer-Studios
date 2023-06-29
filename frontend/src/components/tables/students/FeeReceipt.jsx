import React, { useContext, useState, useEffect } from 'react';
import client from '../../../api';
import SessionContext from '../../../contexts/SessionContext';
import { TableLoading } from '../../TableLoading';

export const FeeReceipt = () => {
    const [receipts, setreceipt] = useState([]);
    const [loading, setloading] = useState(false);
    const { user } = useContext(SessionContext);

    useEffect(() => {
        async function fetchreceipt() {
            try {
                setloading(true);
                const { data } = await client.get(`/fees/${user.id}`);
                if (data.rowCount > 0) {
                    setreceipt(data.rows);
                }
                setloading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchreceipt();
    }, [user.id]);

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Fee Receipts</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </nav>
            </div>

            <section className="section dashboard">
                <div className="col-12">
                    <div className="card top-selling overflow-auto">
                        <div className="card-body pb-0">
                            <h5 className="card-title">User Accounts</h5>

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        {loading || (
                                            <>
                                                <th scope="col">No</th>
                                                <th scope="col">Date Issued</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Payement ID</th>
                                                <th scope="col">Receipt</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <TableLoading />
                                    ) : (
                                        receipts.map((receipt, i) => {
                                            let buffer = new Uint8Array(receipt.pdf.data);
                                            const fileURL = URL.createObjectURL(
                                                new Blob([buffer], { type: 'application/pdf' })
                                            );
                                            return (
                                                <tr key={i}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{receipt.date_issued.slice(0, 10)}</td>
                                                    <td>&#8377;{receipt.amount}</td>
                                                    <td>{receipt.id}</td>
                                                    <td>
                                                        <a href={fileURL} target="_blank" rel="noreferrer">
                                                            <i
                                                                style={{
                                                                    color: 'red',
                                                                    cursor: 'pointer',
                                                                    position: 'relative',
                                                                    left: '1rem',
                                                                }}
                                                                className="fa-sharp fa-regular fa-file-lines fa-lg"
                                                            ></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
