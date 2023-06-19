import React, { useContext, useState, useEffect } from "react";
import Modal from "../../Modal";
import ModalButton from "../../ModalButton";
import ViewfeedbacModal from "../../modals/feedbackModals/ViewfeedbacModal";
import SessionContext from "../../../contexts/SessionContext";
import client from "../../../api";
import { TableLoading } from "../../TableLoading";
import { SearchMenu } from "../../SearchMenu";
import useSearch from "../../../hooks/useSearch";

function ViewFeedback() {
  const { user,clearMessage } = useContext(SessionContext);
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dummy, setDummy, handleQueryChange } = useSearch(list);

  const Fetch_Feedback = async () => {
    try {
      setLoading(true);
      const { data } = await client.get(`/feedbacks/student/${user.id}`);
      if (data.rowCount > 0) {
        setlist(data.rows);
        setDummy(data.rows);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    await client.put("feedbacks/clearCounMessage/" + user.id);
    clearMessage();
  };
  useEffect(() => {
    Fetch_Feedback();
  }, []);

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Feedback</li>
              <li className="breadcrumb-item active">View feedback</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="col-12">
            <div className="card top-selling overflow-auto">
              <div className="card-body pb-0">
                <div className="d-flex">
                  <h5 style={{ width: "80%" }} className="card-title">
                    Feed back of students
                  </h5>
                  <div className="mt-3">
                    <SearchMenu handleQueryChange={handleQueryChange} />
                  </div>
                </div>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      {loading || (
                        <>
                          <th scope="col">Student Id</th>
                          <th scope="col">Student Name</th>
                          <th scope="col">Student Email</th>
                          <th scope="col">Date</th>
                          <th scope="col">Attachment</th>
                          <th scope="col">Feedback</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <TableLoading />
                    ) : (
                      dummy.map((student, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{student.id}</th>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                              {student.date!==null?new Date(student.date).toLocaleDateString(
                                "en-GB"
                              ):new Date().toLocaleDateString('en-GB')}
                            </td>
                            <td>
                              {student.pdf !== null ? (
                                <a target="_blank" rel="noreferrer">
                                  <i
                                    style={{
                                      color: "red",
                                      cursor: "pointer",
                                      position: "relative",
                                      left: "5px",
                                    }}
                                    className="fa-sharp fa-regular fa-file-lines fa-lg"
                                  ></i>
                                </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </td>
                            <td>
                              <Modal id={"view_s_feedback" + i} large>
                                <ViewfeedbacModal
                                  comment={student.comment}
                                  pdf={null}
                                />
                              </Modal>
                              <ModalButton
                                id={"view_s_feedback" + i}
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

export default ViewFeedback;
