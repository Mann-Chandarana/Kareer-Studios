import React, { useEffect, useState } from 'react';
import client from '../../../api';
import useDelete from '../../../hooks/useDelete';
import useSearch from '../../../hooks/useSearch';
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';
import AddParent from '../../modals/addModals/AddParent';
import EditParent from '../../modals/editModals/EditParent';
import { ParentInfo } from '../../modals/infoModals/ParentInfo';
import { SearchMenu } from '../../SearchMenu';
import SmallSpinner from '../../SmallSpinner';
import { TableLoading } from '../../TableLoading';

function AdminParentTable() {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { dummy, setDummy, handleQueryChange } = useSearch(parents);
    const { deleteUser } = useDelete();

    const getParents = async () => {
        try {
            const { data } = await client.get('/parents');
            if (data.rowCount > 0) {
                setParents(data.rows);
                setDummy(data.rows);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getParents();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Modal id="add-parent">
                <AddParent callback={getParents} />
            </Modal>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item">Accounts</li>
                            <li className="breadcrumb-item active">Parents</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="col-12">
                        <div className="card top-selling overflow-auto">
                            <div className="filter d-flex align-items-center">
                                <SearchMenu handleQueryChange={handleQueryChange} />
                                <ModalButton id="add-parent" className="btn btn-success btn-sm mx-4">
                                    Add Parent
                                </ModalButton>
                            </div>
                            <div className="card-body pb-0">
                                <h5 className="card-title">
                                    Parent Accounts
                                    <br />
                                    <span style={{ fontSize: '14px' }}>
                                        Total parents: {loading ? <SmallSpinner /> : parents.length}
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
                                            dummy.map((parent) => {
                                                return (
                                                    <tr key={parent.id}>
                                                        <th scope="row">{parent.id}</th>
                                                        <td>{parent.name}</td>
                                                        <td>{parent.email}</td>
                                                        <td>
                                                            <Modal id={'edit_p_' + parent.id}>
                                                                <EditParent parentData={parent} callback={getParents} />
                                                            </Modal>
                                                            <ModalButton id={'edit_p_' + parent.id} className="icon">
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </ModalButton>
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    deleteUser(parent.id, 'parent', getParents)
                                                                }
                                                                className="icon"
                                                            >
                                                                <i
                                                                    style={{ color: 'red' }}
                                                                    className="fa-solid fa-trash icon"
                                                                ></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <Modal id={'view_p_' + parent.id} large>
                                                                <ParentInfo parentData={parent} />
                                                            </Modal>
                                                            <ModalButton
                                                                id={'view_p_' + parent.id}
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

export default AdminParentTable;
