import React, { useContext } from "react";
import SessionContext from "../../../contexts/SessionContext";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import client from "../../../api";

function SAT({data, flag}) {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  const handleDelete = (row_id) => {
    client
      .delete(`/records/delSat/${row_id}`)
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

  return (
   <>
          {/* SAT Scores Table */}
          <p className="mt-4">SAT Scores</p>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Math</th>
                <th>English</th>
                <th>Essay</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flag && (
                <>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sat_math_score}</td>
                      <td>{row.sat_english_score}</td>
                      <td>{row.sat_essay_score}</td>
                      <td>{row.sat_date}</td>
                      <td className="d-flex flex-col justify-content-center gap-2">
                        <button className="btn btn-primary">E</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>D</button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
</>
  );
}

export default SAT;
