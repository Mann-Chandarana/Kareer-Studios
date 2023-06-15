import React, { useContext } from "react";
import SessionContext from "../../../contexts/SessionContext";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

function GRE() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  // get records
  const [{ apiData: greData }] = useFetch(id, "gre");


  let flagGre = false;
  let gre = [];
  if (greData) {
    flagGre = true;

    gre = greData.rows.map((row) => ({
      gre_verbal_score: row.gre_verbal_score ?? "",
      gre_quant_score: row.gre_quant_score ?? "",
      gre_writing_score: row.gre_writing_score ?? "",
      gre_date: row.gre_date ?? "",
    }));

    console.log(gre);
  }



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
              {flagGre && (
                <>
                  {gre.map((data, index) => (
                    <tr key={index}>
                      <td>{data.gre_verbal_score}</td>
                      <td>{data.gre_quant_score}</td>
                      <td>{data.gre_writing_score}</td>
                      <td>{data.gre_date}</td>
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

export default GRE;
