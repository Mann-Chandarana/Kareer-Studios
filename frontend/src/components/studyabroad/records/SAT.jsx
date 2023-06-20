import React, { useState, useContext } from "react";
import SessionContext from "../../../contexts/SessionContext";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import client from "../../../api";
import EditSAT from "../modals/EditSAT";

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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const openModal = (row_id) => {
    const selectedRow = data.find((row) => row.id === row_id);
    setSelectedData(selectedRow);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(selectedData);

  return (
   <>
   {isOpen && <EditSAT data={selectedData} onClose={closeModal}></EditSAT>}
          {/* SAT Scores Table */}
          <h5 className="mt-4 fw-bold">SAT Scores</h5>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Math</th>
                <th>English</th>
                <th>Essay</th>
                <th>Overall</th>
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
                      <td>{row.sat_overall}</td>
                      <td>{row.sat_date}</td>
                      <td className="d-flex flex-col justify-content-center gap-2">
                        <button className="btn btn-primary" onClick={() => openModal(row.id)}>E</button>
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
