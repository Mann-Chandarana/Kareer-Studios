import React, { useContext } from "react";
import SessionContext from "../../../contexts/SessionContext";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

function PTE() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  // get records
const [{ apiData: pteData }] = useFetch(id, "pte");


  let flagPte = false;
  let pte = [];
  if (pteData) {
    flagPte = true;

    pte = pteData.rows.map((row) => ({
      pte_listening_score: row.pte_listening_score ?? "",
      pte_reading_score: row.pte_reading_score ?? "",
      pte_writing_score: row.pte_writing_score ?? "",
      pte_speaking_score: row.pte_speaking_score ?? "",
      pte_date: row.pte_date ?? "",
    }));

    console.log(pte);
  }


  return (
   <>

          {/* PTE Scores Table */}
          <p className="mt-4">PTE Scores</p>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Listening</th>
                <th>Reading</th>
                <th>Writing</th>
                <th>Speaking</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flagPte && (
                <>
                  {pte.map((data, index) => (
                    <tr key={index}>
                      <td>{data.pte_listening_score}</td>
                      <td>{data.pte_reading_score}</td>
                      <td>{data.pte_writing_score}</td>
                      <td>{data.pte_speaking_score}</td>
                      <td>{data.pte_date}</td>
                      <td className="d-flex flex-col justify-content-center gap-2">
                        <button className="btn btn-primary">E</button>
                        <button className="btn btn-danger">D</button>
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

export default PTE;
