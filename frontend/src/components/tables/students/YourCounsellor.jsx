import React, { useContext, useEffect, useState } from 'react';
import SessionContext from '../../../contexts/SessionContext';
import client from '../../../api';
import { TableLoading } from '../../TableLoading';
import { CounsellorInfo } from '../../modals/infoModals/CounsellorInfo';
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';

function YourCounsellor() {
    const { user } = useContext(SessionContext);

    const [counsellors, setCounsellors] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCounsellors = async () => {
        try {
            const { data } = await client('/counsellors/student/' + user.id);
            if (data.rowCount > 0) {
                setCounsellors(data.rows);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getCounsellors();
        // eslint-disable-next-line
    }, []);

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Dashboard</li>
                        <li className="breadcrumb-item active">Counsellors</li>
                    </ol>
                </nav>
            </div>

            <section className="section dashboard">
                <div className="col-12">
                    <div className="card top-selling overflow-auto">
                        <div className="card-body pb-0">
                            <h5 className="card-title">User Accounts</h5>

                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        {loading || (
                                            <>
                                                <th scope="col">ID</th>
                                                <th scope="col">Counsellor Name</th>
                                                <th scope="col">Counsellor Email</th>
                                                <th scope="col">Counsellor No.</th>
                                                <th scope="col">Info</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <TableLoading />
                                    ) : (
                                        counsellors.map((counsellor) => {
                                            return (
                                                <tr key={counsellor.id}>
                                                    <th scope="row">{counsellor.id}</th>
                                                    <td className="fw-bold">{counsellor.name}</td>
                                                    <td>{counsellor.email}</td>
                                                    <td>{counsellor.phone}</td>
                                                    <td>
                                                        <Modal id={'view_c_' + counsellor.id} large>
                                                            <CounsellorInfo
                                                                counsellorData={counsellor}
                                                                role="student"
                                                            />
                                                        </Modal>
                                                        <ModalButton
                                                            id={'view_c_' + counsellor.id}
                                                            className="btn btn-sm btn-info text-white"
                                                        >
                                                            View
                                                        </ModalButton>
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
}

export default YourCounsellor;
