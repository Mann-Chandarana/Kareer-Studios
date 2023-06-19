import React, { useContext, useEffect, useState } from "react";
import Modal from "../../Modal";
import ModalButton from "../../ModalButton";
import AddFeedback from "../../modals/feedbackModals/AddFeedback";
import SessionContext from "../../../contexts/SessionContext";
import EditFeedback from "../../modals/feedbackModals/EditFeedback";
import { SearchMenu } from "../../SearchMenu";
import client from "../../../api";
import { TableLoading } from "../../TableLoading";
import useSearch from "../../../hooks/useSearch";

const GiveFeedback = () => {
  const { user } = useContext(SessionContext);
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dummy, setDummy, handleQueryChange } = useSearch(list);

  const Fetch_Feedback = async () => {
    try {
      setLoading(true);
      const { data } = await client.get(`/feedbacks/counsellor/${user.id}`);

      if (data.rowCount > 0) {
        setlist(data.rows);
        setDummy(data.rows);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Fetch_Feedback();
  }, []);

  const delete_Feedback = async (id) => {
    try {
      await client.delete("feedbacks/delete_feedback/" + id);

      setlist((prev) => {
        return prev.filter((data) => {
          return data.id != id;
        });
      });

      setDummy((prev) => {
        return prev.filter((data) => {
          return data.id != id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal id="add-feedback">
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
                <ModalButton
                  id="add-feedback"
                  className="btn btn-success btn-sm mx-4 text-white"
                >
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
                          <th scope="col">Student Id</th>
                          <th scope="col">Email</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">Mobile No</th>
                          <th scope="col">Status</th>
                          <th scope="col">File</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <TableLoading />
                    ) : (
                      dummy.map((student, i) => {
                        let fileURL = "";
                        if (student.pdf != null) {
                          let buffer = new Uint8Array(student.pdf.data);
                          fileURL = URL.createObjectURL(
                            new Blob([buffer], { type: "application/pdf" })
                          );
                        }
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{student.name}</td>
                            <th scope="row">{student.student_id}</th>
                            <td>{student.email}</td>
                            <td>
                              {new Date(student.start_date).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>{student.phone}</td>
                            <td>
                              {student.status ? (
                                <span className="badge rounded-pill text-bg-success">
                                  Completed
                                </span>
                              ) : (
                                <span className="badge rounded-pill text-bg-danger">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td>
                              <a
                                href={fileURL == "" ? null : fileURL}
                                target="_blank"
                                rel="noreferrer"
                              >
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
                            </td>
                            <td>
                              <Modal id={"edit_s_feededit" + i}>
                                <EditFeedback
                                  id={student.id}
                                  student_id={student.student_id}
                                  Performance={student.performance}
                                  comments={student.comments}
                                  status={student.status}
                                  start_date={student.start_date}
                                  Fetch_Feedback={Fetch_Feedback}
                                />
                              </Modal>
                              <ModalButton
                                id={"edit_s_feededit" + i}
                                className="icon"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </ModalButton>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  delete_Feedback(student.id);
                                }}
                                className="icon"
                              >
                                <i
                                  style={{ color: "red" }}
                                  className="fa-solid fa-trash"
                                ></i>
                              </button>
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
};

export default GiveFeedback;
