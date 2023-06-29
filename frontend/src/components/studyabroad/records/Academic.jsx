import React, { useContext, useState } from "react";
import SessionContext from "../../../contexts/SessionContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import client from "../../../api";
import EditAcademic from "../modals/EditAcademic";

function Academic({ data, flag }) {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  console.log(data);
  const navigate = useNavigate();

  const handleDelete = (student_id) => {
    client
      .delete(`/records/delAcademic/${student_id}`)
      .then((response) => {
        toast.success("Data deleted successfully.");
        window.location.reload();
        // Handle any necessary state updates or notifications
      })
      .catch((error) => {
        toast.error("Error deleting data: ", error);
        // Handle error and display error message
      });
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <EditAcademic data={data} onClose={closeModal}></EditAcademic>}
      {/* Academic Scores Table */}
      <h5 className="mt-4 fw-bold">Academic Scores</h5>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Board/University</th>
            <th>School/College</th>
            <th>Year of Passing</th>
            <th>Score</th>
            <th>Type</th>
            <th>Backlogs?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>SSC</th>
            {flag && (
              <>
                {data.map((row, index) => (
                  <>
                    <td>{row.ssc_board}</td>
                    <td>{row.ssc_school}</td>
                    <td>{row.ssc_year}</td>
                    <td>{row.ssc_score}</td>
                    <td>{row.ssc_type}</td>
                    <td>{row.ssc_backlog}</td>
                    <td
                      className="align-middle text-center"
                      style={{ verticalAlign: "middle" }}
                      rowSpan="4"
                    >
                      <div className="d-flex flex-col justify-content-center gap-2">
                        <button className="btn btn-primary" onClick={openModal}>
                          E
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(row.student_id)}
                        >
                          D
                        </button>
                      </div>
                    </td>
                  </>
                ))}
              </>
            )}
          </tr>

          <tr>
            <th>HSC</th>
            {flag && (
              <>
                {data.map((row, index) => (
                  <>
                    <td>{row.hsc_board}</td>
                    <td>{row.hsc_school}</td>
                    <td>{row.hsc_year}</td>
                    <td>{row.hsc_score}</td>
                    <td>{row.hsc_type}</td>
                    <td>{row.hsc_backlog}</td>
                  </>
                ))}
              </>
            )}
          </tr>

          <tr>
            <th>Diploma</th>
            {flag && (
              <>
                {data.map((row, index) => (
                  <>
                    <td>{row.diploma_uni}</td>
                    <td>{row.diploma_college}</td>
                    <td>{row.diploma_year}</td>
                    <td>{row.diploma_score}</td>
                    <td>{row.diploma_type}</td>
                    <td>{row.diploma_backlog}</td>
                  </>
                ))}
              </>
            )}
          </tr>

          <tr>
            <th>UG</th>
            {flag && (
              <>
                {data.map((row, index) => (
                  <>
                    <td>{row.ug_uni}</td>
                    <td>{row.ug_college}</td>
                    <td>{row.ug_year}</td>
                    <td>{row.ug_score}</td>
                    <td>{row.ug_type}</td>
                    <td>{row.ug_backlog}</td>
                  </>
                ))}
              </>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Academic;
