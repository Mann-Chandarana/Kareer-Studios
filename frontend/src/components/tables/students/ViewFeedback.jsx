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
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <TableLoading />
                  ) : (
                    feedback.map((student,i) => {
                        console.log(student)
                      return (
                          <tr key={i}>
                          <th scope="row">{i+1}</th>
                          <td>{new Date(student.start_date).toLocaleDateString('en-GB')}</td>
                          <td>{student.performance}</td>
                          <td className="fw-bold">{student.comments}</td>
                          
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
