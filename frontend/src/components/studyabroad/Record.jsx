import React, { useContext } from "react";
import SessionContext from "../../contexts/SessionContext";
import useCaptialize from "../../hooks/useCaptialize";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Record() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  // get records
  const [{ apiData: academicData }] = useFetch(id, "academic");
  const [{ apiData: ieltsData }] = useFetch(id, "ielts");
  const [{ apiData: pteData }] = useFetch(id, "pte");
  const [{ apiData: greData }] = useFetch(id, "gre");
  const [{ apiData: satData }] = useFetch(id, "sat");
  const [{ apiData: gmatData }] = useFetch(id, "gmat");

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

    console.log(academic);
  }

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
                  {ieltsData.map((data, index) => (
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
                  {pteData.map((data, index) => (
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
                  {greData.map((data, index) => (
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
                  {satData.map((data, index) => (
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
                  {gmatData.map((data, index) => (
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
        </div>
      </div>
    </main>
  );
}

export default Record;
