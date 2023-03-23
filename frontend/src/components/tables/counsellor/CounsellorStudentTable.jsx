import React, { useContext, useState, useEffect } from 'react';
import SessionContext from '../../../contexts/SessionContext';
import client from '../../../api';
import ShowLink from '../../modals/ShowLink';
import EditStudent from '../../modals/editModals/EditStudent';
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';
import { TableLoading } from '../../TableLoading';
import StudentInfo from '../../modals/infoModals/StudentInfo';
import { SearchMenu } from '../../SearchMenu';
import useSearch from '../../../hooks/useSearch';
import SmallSpinner from '../../SmallSpinner';

function CounsellorStudentTable() {
    const { user } = useContext(SessionContext);
    const [link, setLink] = useState('');

    const fetchLink = async () => {
        try {
            const { data } = await client.get('link/generate');
            setLink(data.link);
        } catch (error) {
            console.log(error);
        }
    };

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { dummy, setDummy, handleQueryChange } = useSearch(students);

    const getStudents = async () => {
        try {
            const { data } = await client.get('/students/counsellor/' + user.id);
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
            <Modal id={'generate-link'}>
                <ShowLink link={link} />
            </Modal>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                            <li className="breadcrumb-item active">Students</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="col-12">
                        <div className="card top-selling overflow-auto">
                            <div className="filter d-flex align-items-center">
                                <SearchMenu handleQueryChange={handleQueryChange} />
                                <ModalButton
                                    id="generate-link"
                                    className="btn btn-success btn-sm mx-4"
                                    onClick={() => fetchLink()}
                                >
                                    Generate Link
                                </ModalButton>
                            </div>
                            <div className="card-body pb-0">
                                <h5 className="card-title">
                                    Students Accounts
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
                                                    <th scope="col">Counsellor</th>
                                                    <th scope="col">Reg. fees</th>
                                                    <th scope="col">Edit</th>
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
                                                student.counsellor_name = user.name;
                                                return (
                                                    <tr key={student.id}>
                                                        <th scope="row">{student.id}</th>
                                                        <td>{student.name}</td>
                                                        <td>{student.email}</td>
                                                        <td className="fw-bold">{user.name}</td>
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
                                                            <Modal id={student.id}>
                                                                <EditStudent
                                                                    callback={getStudents}
                                                                    studentData={student}
                                                                />
                                                            </Modal>
                                                            <ModalButton id={student.id} className="icon">
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </ModalButton>
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

export default CounsellorStudentTable;
