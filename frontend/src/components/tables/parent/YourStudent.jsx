import React, { useContext, useState, useEffect } from 'react';
import SessionContext from '../../../contexts/SessionContext';
import client from '../../../api';
import { TableLoading } from '../../TableLoading';
import StudentInfo from '../../modals/infoModals/StudentInfo';
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';

function YourStudent() {
    const { user } = useContext(SessionContext);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStudents = async () => {
        try {
            const { data } = await client.get('/students/parent/' + user.id);
            if (data.rowCount > 0) {
                setStudents(data.rows);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getStudents();
        // eslint-disable-next-line
    }, []);

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Dashboard</li>
                        <li className="breadcrumb-item">Accounts</li>
                        <li className="breadcrumb-item active">students</li>
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
                                                <th scope="col">Child_ID</th>
                                                <th scope="col">Child_name</th>
                                                <th scope="col">Child_email</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Info</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <TableLoading />
                                    ) : (
                                        students.map((student) => {
                                            student.counsellor_name = student.counsellor_id;
                                            return (
                                                <tr key={student.id}>
                                                    <th scope="row">{user.id}</th>
                                                    <th scope="row">{student.id}</th>
                                                    <td>{student.name}</td>
                                                    <td>{student.email}</td>
                                                    <td className="fw-bold">{user.phone}</td>
                                                    <td>
                                                        <Modal id={'view_' + student.id} large>
                                                            <StudentInfo studentData={student} />
                                                        </Modal>
                                                        <ModalButton
                                                            id={'view_' + student.id}
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

export default YourStudent;
