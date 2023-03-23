import React, { useEffect, useState } from 'react';
import client from '../../../api';
import useDelete from '../../../hooks/useDelete';
import AddStudent from '../../modals/addModals/AddStudent';
import EditStudent from '../../modals/editModals/EditStudent';
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';
import { TableLoading } from '../../TableLoading';
import StudentInfo from '../../modals/infoModals/StudentInfo';
import { SearchMenu } from '../../SearchMenu';
import useSearch from '../../../hooks/useSearch';
import SmallSpinner from '../../SmallSpinner';

function AdminStudentTable() {
    const [students, setStudents] = useState([]);
    const { dummy, setDummy, handleQueryChange } = useSearch(students);

    const [loading, setLoading] = useState(true);
    const { deleteUser } = useDelete();

    const getStudents = async () => {
        try {
            const { data } = await client.get('/students');
            if (data.rowCount > 0) {
                setStudents(data.rows);
                setDummy(data.rows);
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
        <>
            <Modal id="add-student">
                <AddStudent callback={getStudents} />
            </Modal>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item">Accounts</li>
                            <li className="breadcrumb-item active">Students</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="col-12">
                        <div className="card top-selling overflow-auto">
                            <div className="filter d-flex align-items-center">
                                <SearchMenu handleQueryChange={handleQueryChange} />
                                <ModalButton id="add-student" className="btn btn-success btn-sm mx-4">
                                    Add Student
                                </ModalButton>
                            </div>
                            <div className="card-body pb-0">
                                <h5 className="card-title">
                                    Student Accounts
                                    <br />
                                    <span style={{ fontSize: '14px' }}>
                                        Total students: {loading ? <SmallSpinner /> : students.length}
                                    </span>
                                </h5>

                                <table className="table table-borderless table-hover">
                                    <thead>
                                        <tr>
                                            {loading || (
                                                <>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Counsellor</th>
                                                    <th scope="col">Reg. fees</th>
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
                                            dummy.map((student) => {
                                                return (
                                                    <tr key={student.id}>
                                                        <th scope="row">{student.id}</th>
                                                        <td>{student.name}</td>
                                                        <td>{student.email}</td>
                                                        <td>{student.phone}</td>
                                                        <td className="fw-bold">{student.counsellor_name}</td>
                                                        <td>
                                                            {student.paid ? (
                                                                <span class="badge rounded-pill text-bg-success">
                                                                    Paid
                                                                </span>
                                                            ) : (
                                                                <span class="badge rounded-pill text-bg-danger">
                                                                    Pending
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td>
                                                            <Modal id={'edit_' + student.id}>
                                                                <EditStudent
                                                                    studentData={student}
                                                                    callback={getStudents}
                                                                />
                                                            </Modal>
                                                            <ModalButton id={'edit_' + student.id} className="icon">
                                                                <i className="fa-solid fa-pen-to-square icon"></i>
                                                            </ModalButton>
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    deleteUser(student.id, 'student', getStudents)
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
        </>
    );
}

export default AdminStudentTable;
