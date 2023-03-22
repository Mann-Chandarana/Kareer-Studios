import React, { useContext, useState, useEffect } from 'react';
import SessionContext from '../../../contexts/SessionContext';
import client from '../../../api';
import { TableLoading } from '../../TableLoading';
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';
import { ParentInfo } from '../../modals/infoModals/ParentInfo';

function Yourparent() {
    const { user } = useContext(SessionContext);

    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getParents = async () => {
        try {
            const { data } = await client.get('/parents/student/' + user.id);
            if (data.rowCount > 0) {
                setParents(data.rows);
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
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Dashboard</li>
                        <li className="breadcrumb-item active">Parents</li>
                    </ol>
                </nav>
            </div>

            <section className="section dashboard">
                <div className="col-12">
                    <div className="card top-selling overflow-auto">
                        <div className="card-body pb-0">
                            <h5 className="card-title">User Accounts</h5>

                            <table className="table table-borderless table-hover">
                                <thead>
                                    <tr>
                                        {loading || (
                                            <>
                                                <th scope="col">ID</th>
                                                <th scope="col">Parent_Name</th>
                                                <th scope="col">Parent_Email</th>
                                                <th scope="col">Parent_Role</th>
                                                <th scope="col">Parent_Phone-number</th>
                                                <th scope="col">info</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <TableLoading />
                                    ) : (
                                        parents.map((parent) => {
                                            return (
                                                <tr key={parent.id}>
                                                    <th scope="row">{parent.id}</th>
                                                    <td className="fw-bold">{parent.name}</td>
                                                    <td>{parent.email}</td>
                                                    <td>{parent.gender === 'female' ? 'Mother' : 'Father'}</td>
                                                    <td>{parent.phone}</td>
                                                    <td>
                                                        <Modal id={'view_' + parent.id} large>
                                                            <ParentInfo parentData={parent} />
                                                        </Modal>
                                                        <ModalButton
                                                            id={'view_' + parent.id}
                                                            className="btn btn-sm btn-warning"
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

export default Yourparent;
