import React, { useContext, useEffect, useState } from "react";
import client from "../../../api";
import SessionContext from "../../../contexts/SessionContext";
import Modal from "../../Modal";
import AddStudentFeedback from "../../modals/feedbackModals/AddStudentFeedback";
import ModalButton from "../../ModalButton";
import useSearch from "../../../hooks/useSearch";
import EditStudFeedback from "../../modals/feedbackModals/EditStudFeedback";
import { TableLoading } from "../../TableLoading";

const GiveFeedback = () => {
  const { user } = useContext(SessionContext);
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dummy, setDummy, handleQueryChange } = useSearch(list);

  const Fetch_Feedback = async () => {
    try {
      setLoading(true);
      const { data } = await client.get(`/feedbacks/student_counsellor`);

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
      await client.delete("feedbacks/deleteFeedbackStudents/" + id);

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
        <AddStudentFeedback
          student_id={user.id}
          counsellor_id={user.counsellor_id}
		  Fetch_Feedback={Fetch_Feedback}
        ></AddStudentFeedback>
      </Modal>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item">Comments</li>
              <li className="breadcrumb-item active">Give Comment</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="col-12">
            <div className="card top-selling overflow-auto">
              <div className="filter d-flex align-items-center">
                <ModalButton
                  id="add-feedback"
                  className="btn btn-success btn-sm mx-4 text-white"
                >
                  Add Comment
                </ModalButton>
              </div>
              <div className="card-body pb-0">
                <h5 className="card-title">
                  Add Comment of students
                  <br />
                </h5>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      {loading || (
                        <>
                          <th scope="col">ID</th>
                          <th scope="col">date</th>
                          <th scope="col">Counsellor Id</th>
                          <th scope="col">Comment</th>
                          <th scope="col">Edit</th>
                          <th scope="col">File</th>
                          <th scope="col">Delete</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(dummy)}
                    {loading? (
                      <TableLoading />
                    ) : (
                      dummy.map((student, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>
                              {student.date!==""?
                                new Date(student.date).toLocaleDateString("en-GB")
                                :new Date().toLocaleDateString("en-GB")}
                            </td>
                            <td>{user.counsellor_id}</td>
                            <td>{student.comment.slice(0,25)}{(student.comment).length>25&&<span>......</span>}</td>
                            <td>
                              <Modal id={"edit_s_feededit" + i}>
                                <EditStudFeedback
                                  id={student.id}
                                  comment={student.comment}
                                  date={student.date}
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
                              <a target="_blank" rel="noreferrer">
                                {student.pdf!==null?<i
                                  style={{
                                    color: "red",
                                    cursor: "pointer",
                                    position: "relative",
                                    left: "5px",
                                  }}
                                  className="fa-sharp fa-regular fa-file-lines fa-lg"
                                ></i>:<span className="fw-bold">No Item</span>}
                              </a>
                            </td>
                            <td>
                              <button className="icon"
							  
							   onClick={()=>{delete_Feedback(student.id)}} >
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
