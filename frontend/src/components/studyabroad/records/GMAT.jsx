import React, { useContext } from "react";
import SessionContext from "../../../contexts/SessionContext";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

function GMAT() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  // get records
  const [{ apiData: gmatData }] = useFetch(id, "gmat");

  let flagGmat = false;
  let gmat = [];
  if (gmatData) {
    flagGmat = true;

    gmat = gmatData.rows.map((row) => ({
      gmat_verbal_score: row.gmat_verbal_score ?? "",
      gmat_quant_score: row.gmat_quant_score ?? "",
      gmat_writing_score: row.gmat_writing_score ?? "",
      gmat_date: row.gmat_date ?? "",
    }));

    console.log(gmat);
  }

  return (
    <>
    
          {/* GMAT Scores Table */}
          <p className="mt-4">GMAT Scores</p>
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
              {flagGmat && (
                <>
                  {gmat.map((data, index) => (
                    <tr key={index}>
                      <td>{data.gmat_verbal_score}</td>
                      <td>{data.gmat_quant_score}</td>
                      <td>{data.gmat_writing_score}</td>
                      <td>{data.gmat_date}</td>
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

export default GMAT;
