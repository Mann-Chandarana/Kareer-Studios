import React, { useContext } from "react";
import SessionContext from "../../../contexts/SessionContext";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

function SAT() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  // get records
  const [{ apiData: satData }] = useFetch(id, "sat");


  let flagSat = false;
  let sat = [];
  if (satData) {
    flagSat = true;

    sat = satData.rows.map((row) => ({
      sat_math_score: row.sat_math_score ?? "",
      sat_english_score: row.sat_english_score ?? "",
      sat_essay_score: row.sat_essay_score ?? "",
      sat_date: row.gre_date ?? "",
    }));

    console.log(sat);
  }


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
              {flagSat && (
                <>
                  {sat.map((data, index) => (
                    <tr key={index}>
                      <td>{data.sat_math_score}</td>
                      <td>{data.sat_english_score}</td>
                      <td>{data.sat_essay_score}</td>
                      <td>{data.sat_date}</td>
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

export default SAT;
