import React, { useContext } from "react";
import SessionContext from "../../contexts/SessionContext";
import useCaptialize from "../../hooks/useCaptialize";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import GMAT from "./records/GMAT";
import GRE from "./records/GRE";
import IELTS from "./records/IELTS";
import PTE from "./records/PTE";
import SAT from "./records/SAT";


function Record() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  // get records
  const [{ apiData: academicData }] = useFetch(id, "academic");

  console.log(academicData);

  let flagAcademic = false;
  let academic = [];
  if (academicData) {
    flagAcademic = true;

    academic = academicData.rows.map((row) => ({
      ssc_board: row.ssc_board ?? "",
      ssc_year: row.ssc_year ?? "",
      ssc_score: row.ssc_score ?? "",
      ssc_backlog: row.ssc_backlog ?? "",

      hsc_board: row.hsc_board ?? "",
      hsc_year: row.hsc_year ?? "",
      hsc_score: row.hsc_score ?? "",
      hsc_backlog: row.hsc_backlog ?? "",

      diploma_uni: row.diploma_uni ?? "",
      diploma_year: row.diploma_year ?? "",
      diploma_score: row.diploma_score ?? "",
      diploma_backlog: row.diploma_backlog ?? "",

      ug_uni: row.ug_uni ?? "",
      ug_year: row.ug_year ?? "",
      ug_score: row.ug_score ?? "",
      ug_backlog: row.ug_backlog ?? "",
    }));

    console.log(typeof(academic));
  }
  
  return (
    <main id="main" className="main">
      <div>
        <br></br>
        {user.role === "student" && (
          <div style={{ display: "flex", justifyContent: "right" }}>
            <CButton type="submit" color="primary" variant="outline">
              <Link to={"/score/" + id}>Add scores </Link>
            </CButton>
            <br></br>
          </div>
        )}

        <br></br>

        <center>
          <h4 className="heading">RECORDS</h4>
        </center>
        <br></br>

        <div>
          {/* Academic Scores Table */}
          <p className="mt-4">Academic Scores</p>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Board/University</th>
                <th>Year of Passing</th>
                <th>Score</th>
                <th>Backlogs?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>SSC</th>
                {flagAcademic && (
                  <>
                    <td>{academic[0].ssc_board}</td>
                    <td>{academic[0].ssc_year}</td>
                    <td>{academic[0].ssc_score}</td>
                    <td>{academic[0].ssc_backlog}</td>
                    <td
                      className="align-middle text-center"
                      style={{ verticalAlign: "middle" }}
                      rowSpan="4"
                    >
                      <div className="d-flex flex-col justify-content-center gap-2">
                        <button className="btn btn-primary">E</button>
                        <button className="btn btn-danger">D</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>

              <tr>
                <th>HSC</th>
                {flagAcademic && (
                  <>
                    <td>{academic[0].hsc_board}</td>
                    <td>{academic[0].hsc_year}</td>
                    <td>{academic[0].hsc_score}</td>
                    <td>{academic[0].hsc_backlog}</td>
                  </>
                )}
              </tr>

              <tr>
                <th>Diploma</th>
                {flagAcademic && (
                  <>
                    <td>{academic[0].diploma_uni}</td>
                    <td>{academic[0].diploma_year}</td>
                    <td>{academic[0].diploma_score}</td>
                    <td>{academic[0].diploma_backlog}</td>
                  </>
                )}
              </tr>

              <tr>
                <th>UG</th>
                {flagAcademic && (
                  <>
                    <td>{academic[0].ug_uni}</td>
                    <td>{academic[0].ug_year}</td>
                    <td>{academic[0].ug_score}</td>
                    <td>{academic[0].ug_backlog}</td>
                  </>
                )}
              </tr>
            </tbody>
          </table>

          {/* IELTS Scores Table */}
          <IELTS></IELTS>

          {/* PTE Scores Table */}
          <PTE></PTE>

          {/* GRE Scores Table */}
          <GRE></GRE>

          {/* SAT Scores Table */}
          <SAT></SAT>

          {/* GMAT Scores Table */}
          <GMAT></GMAT>
        </div>
      </div>
    </main>
  );
}

export default Record;
