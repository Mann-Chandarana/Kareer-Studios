import React, { useContext, useState, useEffect } from "react";
import client from "../../api";
import SessionContext from "../../contexts/SessionContext";
import useCaptialize from "../../hooks/useCaptialize";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";
import Academic from "./records/Academic";
import GMAT from "./records/GMAT";
import GRE from "./records/GRE";
import IELTS from "./records/IELTS";
import PTE from "./records/PTE";
import SAT from "./records/SAT";
import TOEFL from "./records/TOEFL";


function Record() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  const [academicData, setacademicData] = useState([]);
  const [ieltsData, setieltsData] = useState([]);
  const [pteData, setpteData] = useState([]);
  const [greData, setgreData] = useState([]);
  const [gmatData, setgmatData] = useState([]);
  const [satData, setsatData] = useState([]);
  const [toeflData, settoeflData] = useState([]);

  // get records
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: academicData } = await client(`/records/academic/${id}`);
        setacademicData(academicData.rows);
      } catch (error) {
        console.log(error);
      }

      try {
        const { data: ieltsData } = await client(`/records/ielts/${id}`);
        setieltsData(ieltsData.rows);
      } catch (error) {
        console.log(error);
      }

      try {
        const { data: pteData } = await client(`/records/pte/${id}`);
        setpteData(pteData.rows);
      } catch (error) {
        console.log(error);
      }

      try {
        const { data: greData } = await client(`/records/gre/${id}`);
        setgreData(greData.rows);
      } catch (error) {
        console.log(error);
      }

      try {
        const { data: gmatData } = await client(`/records/gmat/${id}`);
        setgmatData(gmatData.rows);
      } catch (error) {
        console.log(error);
      }

      try {
        const { data: satData } = await client(`/records/sat/${id}`);
        setsatData(satData.rows);
      } catch (error) {
        console.log(error);
      }

      try {
        const { data: toeflData } = await client(`/records/toefl/${id}`);
        settoeflData(toeflData.rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  let flagAcademic = academicData ? true : false;
  let flagIelts = ieltsData ? true : false;
  let flagPte = pteData ? true : false;
  let flagGre = greData ? true : false;
  let flagSat = satData ? true : false;
  let flagGmat = satData ? true : false;
  let flagToefl = toeflData ? true : false;
  

  return (
    <main id="main" className="main">
      <div>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
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
          <h4 className="heading fw-bold">ACADEMIC RECORDS</h4>
        </center>
        <br></br>

        <div>
          {/* Academic Scores Table */}
          <Academic data={academicData} flag={flagAcademic}></Academic>

          {/* IELTS Scores Table */}
          <IELTS data={ieltsData} flag={flagIelts}></IELTS>

          {/* PTE Scores Table */}
          <PTE data={pteData} flag={flagPte}></PTE>

          {/* GRE Scores Table */}
          <GRE data={greData} flag={flagGre}></GRE>

          {/* SAT Scores Table */}
          <SAT data={satData} flag={flagSat}></SAT>

          {/* GMAT Scores Table */}
          <GMAT data={gmatData} flag={flagGmat}></GMAT>

          {/* TOEFL Scores Table */}
          <TOEFL data={toeflData} flag={flagToefl}></TOEFL>

        </div>
      </div>
    </main>
  );
}

export default Record;
