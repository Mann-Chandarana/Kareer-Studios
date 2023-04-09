import React, { useState, useEffect } from 'react';
import client from '../../../api';
import useDelete from '../../../hooks/useDelete';
import AddCounsellor from '../../modals/addModals/AddCounsellor';
import EditCounsellor from '../../modals/editModals/EditCounsellor';
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';
import { TableLoading } from '../../TableLoading';
import { CounsellorInfo } from '../../modals/infoModals/CounsellorInfo';
import { SearchMenu } from '../../SearchMenu';
import useSearch from '../../../hooks/useSearch';
import SmallSpinner from '../../SmallSpinner';
import Report from '../../report/Report';

function AdminCounsellorTable() {
    const [counsellors, setCounsellors] = useState([]);
    const { dummy, setDummy, handleQueryChange } = useSearch(counsellors);

    const [loading, setLoading] = useState(true);

    const { deleteUser } = useDelete();

    const getCounsellors = async () => {
        try {
            const { data } = await client('/counsellors');
            if (data.rowCount > 0) {
                setCounsellors(data.rows);
                setDummy(data.rows);
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
        <>
            <Modal id="add-counsellor">
                <AddCounsellor callback={getCounsellors} />
            </Modal>

            <main id="main" className="main">
                
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item">Accounts</li>
                            <li className="breadcrumb-item active">Counsellors</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="col-12">
                        <div className="card top-selling overflow-auto">
                            <div className="filter d-flex align-items-center">
                                <SearchMenu handleQueryChange={handleQueryChange} />
                                <ModalButton id="add-counsellor" className="btn btn-success btn-sm mx-4">
                                    Add Counsellor
                                </ModalButton>
                            </div>
                            <div className="card-body pb-0">
                                <h5 className="card-title">
                                    Counsellor Accounts
                                    <br />
                                    <span style={{ fontSize: '14px' }}>
                                        Total counsellors: {loading ? <SmallSpinner /> : counsellors.length}
                                    </span>
                                </h5>

                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            {loading || (
                                                <>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">No. of Students</th>
                                                    <th scope="col">Member since</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Delete</th>
                                                    <th scope="col">Info</th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <TableLoading />
                                        ) : (
                                            dummy.map((counsellor) => {
                                                return (
                                                    <tr key={counsellor.id}>
                                                        <th scope="row">{counsellor.id}</th>
                                                        <td>{counsellor.name}</td>
                                                        <td>{counsellor.email}</td>
                                                        <td className="fw-bold">{counsellor.number_of_students}</td>
                                                        <td>{new Date(counsellor.createdat).toLocaleDateString()}</td>
                                                        <td>
                                                            <Modal id={'edit_c_' + counsellor.id}>
                                                                <EditCounsellor
                                                                    callback={getCounsellors}
                                                                    counsellorData={counsellor}
                                                                />
                                                            </Modal>
                                                            <ModalButton
                                                                id={'edit_c_' + counsellor.id}
                                                                className="icon"
                                                            >
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </ModalButton>
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    deleteUser(
                                                                        counsellor.id,
                                                                        'counsellor',
                                                                        getCounsellors
                                                                    )
                                                                }
                                                                className="icon"
                                                            >
                                                                <i
                                                                    style={{ color: 'red' }}
                                                                    className="fa-solid fa-trash"
                                                                ></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <Modal id={'view_c_' + counsellor.id} large>
                                                                <CounsellorInfo counsellorData={counsellor} />
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
        </>
    );
}

export default AdminCounsellorTable;
