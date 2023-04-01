import React, { useContext, useEffect, useState } from 'react'
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';
import AddFeedback from '../../modals/feedbackModals/AddFeedback';
import SessionContext from '../../../contexts/SessionContext';
import EditFeedback from '../../modals/feedbackModals/EditFeedback';
import { SearchMenu } from '../../SearchMenu';
import client from '../../../api';
import { TableLoading } from '../../TableLoading';
import useSearch from '../../../hooks/useSearch';

const GiveFeedback = () => {
  const { user } = useContext(SessionContext);
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dummy, setDummy, handleQueryChange } = useSearch(list);

  const Fetch_Feedback = async () => {
    try {
      setLoading(true)
      const { data } = await client.get(`/feedbacks/counsellor/${user.id}`);

      if (data.rowCount > 0) {
        setlist(data.rows);
        setDummy(data.rows);
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    Fetch_Feedback();
  }, [])
  return (
    <>
      <Modal id='add-feedback'>
        <AddFeedback counsellor_id={user.id} Fetch_Feedback={Fetch_Feedback} />
      </Modal>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Feedback</li>
              <li className="breadcrumb-item active">Give feedback</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="col-12">
            <div className="card top-selling overflow-auto">
              <div className="filter d-flex align-items-center">
                <SearchMenu handleQueryChange={handleQueryChange} />
                <ModalButton id="add-feedback" className="btn btn-success btn-sm mx-4 text-white">
                  Add Feedback
                </ModalButton>
              </div>
              <div className="card-body pb-0">
                <h5 className="card-title">
                  Add Feedback of students
                  <br />
                </h5>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      {loading || (
                        <>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Student_id</th>
                          <th scope="col">Edit</th>
                        </>
                      )}

                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <TableLoading /> : (
                      dummy.map((student, i) => {
                        return (
                          <tr>
                            <th scope="row">{i}</th>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <th scope="row">{student.student_id}</th>
                            <td>
                              <Modal id={'edit_s_feededit' + i}>
                                <EditFeedback
                                  id={student.id}
                                  student_id={student.student_id}
                                  Performance={student.performance}
                                  Planning={student.planning}
                                  Feedback={student.feedback}
                                  Fetch_Feedback={Fetch_Feedback}
                                />
                              </Modal>
                              <ModalButton id={'edit_s_feededit' + i} className="icon">
                                <i className="fa-solid fa-pen-to-square"></i>
                              </ModalButton>
                            </td>

                          </tr>
                        )
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
  )
}

export default GiveFeedback