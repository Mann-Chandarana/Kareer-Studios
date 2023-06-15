import React, { useContext, useState, useEffect } from "react";
import SessionContext from "../../contexts/SessionContext";
import useCaptialize from "../../hooks/useCaptialize";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import client from "../../api";

function Record() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();
  const [academic, setacademicData] = useState([]);
  const [ieltsData, setieltsData] = useState([]);
  const [pteData, setpteData] = useState([]);
  const [greData, setgreData] = useState([]);
  const [gmatData, setgmatData] = useState([]);
  const [satData, setsatData] = useState([]);

  // get records
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: academicData } = await client(`/records/academic/${id}`);
        setacademicData(academicData.rows);
        const { data: ieltsData } = await client(`/records/ielts/${id}`);
        setieltsData(ieltsData.rows);
        const { data: pteData } = await client(`/records/pte/${id}`);
        setpteData(pteData.rows);
        const { data: greData } = await client(`/records/gre/${id}`);
        setgreData(greData.rows);
        const { data: gmatData } = await client(`/records/gmat/${id}`);
        setgmatData(gmatData.rows);
        const { data: satData } = await client(`/records/sat/${id}`);
        setsatData(satData.rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  let flagAcademic = academic ? true : false;
  let flagIelts = ieltsData ? true : false;
  let flagPte = pteData ? true : false;
  let flagGre = greData ? true : false;
  let flagSat = satData ? true : false;
  let flagGmat = satData ? true : false;

  console.log(academic, ieltsData);

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
              {flagAcademic &&
                academic.map((data, index) => (
                  <>
                    <tr>
                      <th>SSC</th>
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
                      )
                    </tr>

                    <tr>
                      <th>HSC</th>
                      <>
                        <td>{data.hsc_board}</td>
                        <td>{data.hsc_year}</td>
                        <td>{data.hsc_score}</td>
                        <td>{data.hsc_backlog}</td>
                      </>
                      )
                    </tr>

                    <tr>
                      <th>Diploma</th>
                      <>
                        <td>{data.diploma_uni}</td>
                        <td>{data.diploma_year}</td>
                        <td>{data.diploma_score}</td>
                        <td>{data.diploma_backlog}</td>
                      </>
                      )
                    </tr>

                    <tr>
                      <th>UG</th>
                      <>
                        <td>{data.ug_uni}</td>
                        <td>{data.ug_year}</td>
                        <td>{data.ug_score}</td>
                        <td>{data.ug_backlog}</td>
                      </>
                      )
                    </tr>
                  </>
                ))}
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
