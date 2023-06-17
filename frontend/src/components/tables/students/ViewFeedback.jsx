import React, { useEffect, useState } from "react";
import client from "../../../api";
import { TableLoading } from "../../TableLoading";

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchFeedback = async () => {
    setloading(true);
    try {
      const { data } = await client.get("/feedbacks/counsellor");
      if (data.rowCount > 0) {
        setFeedback(data.rows);
        console.log(feedback);
      }
    } catch (err) {
      console.error(err);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Dashboard</li>
            <li className="breadcrumb-item">Feedback</li>
            <li className="breadcrumb-item active">View Feedback</li>
          </ol>
        </nav>
      </div>

      <section className="section dashboard">
        <div className="col-12">
          <div className="card top-selling overflow-auto">
            <div className="card-body pb-0">
              <h5 className="card-title">User Accounts</h5>

              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    {loading || (
                      <>
                        <th scope="col">ID</th>
                        <th scope="col">Feedback Assigned Date</th>
                        <th scope="col">Your Performance</th>
                        <th scope="col">Comments from your Counsellor</th>
                        <th scope="col">Attachment</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <TableLoading />
                  ) : (
                    feedback.map((student, i) => {
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
                          <td>
                            {student.start_date?new Date(student.start_date).toLocaleDateString(
                              "en-GB"
                            ):<span className="fw-bold">No Date</span>}
                          </td>
                          <td>{student.performance}</td>
                          <td>{student.comments}</td>
                          <td>
                            <a href={fileURL===""?null:fileURL} target="_blank" rel="noreferrer">
                              {fileURL!==""?<i
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                                className="fa-sharp fa-regular fa-file-lines fa-lg"
                              ></i>:<span className="fw-bold">No Item</span>}
                            </a>
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
};

export default ViewFeedback;
