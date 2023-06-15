import React, { useContext } from "react";
import SessionContext from "../../../contexts/SessionContext";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

function IELTS() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  // get records
  const [{ apiData: ieltsData }] = useFetch(id, "ielts");


  console.log(ieltsData);

  let flagIelts = false;
  let ielts = [];
  if (ieltsData) {
    flagIelts = true;

    ielts = ieltsData.rows.map((row) => ({
      ielts_listening_score: row.ielts_listening_score ?? "",
      ielts_reading_score: row.ielts_reading_score ?? "",
      ielts_writing_score: row.ielts_writing_score ?? "",
      ielts_speaking_score: row.ielts_speaking_score ?? "",
      ielts_date: row.ielts_date ?? "",
    }));

    console.log(ielts);
  }


  return (
   <>
          {/* IELTS Scores Table */}
          <p className="mt-4">IELTS Scores</p>
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
              {flagIelts && (
                <>
                  {ielts.map((data, index) => (
                    <tr key={index}>
                      <td>{data.ielts_listening_score}</td>
                      <td>{data.ielts_reading_score}</td>
                      <td>{data.ielts_writing_score}</td>
                      <td>{data.ielts_speaking_score}</td>
                      <td>{data.ielts_date}</td>
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

export default IELTS;
