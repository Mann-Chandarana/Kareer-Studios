import React, { useContext } from "react";
import SessionContext from "../../../contexts/SessionContext";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import client from "../../../api";

function GRE({data, flag}) {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  const handleDelete = (row_id) => {
    client
      .delete(`/records/delGre/${row_id}`)
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

          {/* GRE Scores Table */}
          <p className="mt-4">GRE Scores</p>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Verbal Reasoning</th>
                <th>Quantitative Reasoning</th>
                <th>Analytical Writing</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flag && (
                <>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.gre_verbal_score}</td>
                      <td>{row.gre_quant_score}</td>
                      <td>{row.gre_writing_score}</td>
                      <td>{row.gre_date}</td>
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

export default GRE;
