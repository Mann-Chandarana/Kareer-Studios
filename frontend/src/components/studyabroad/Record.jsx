import React, { useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';
import useCaptialize from '../../hooks/useCaptialize';

import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardText,
  CCol,
  CRow,
  CCarousel,
  CCarouselItem,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CTableBody,
  CButton,
} from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Record() {

  const { user } = useContext(SessionContext);
  let { id } = useParams();

  // get report
  let flag = false;
  const [{ apiData }] = useFetch(id);
  if (apiData) {
    flag = true;
  }

  const academicData = [
    { ssc: 'b', hsc: 'y', diploma: 's', ug: 'b' },
    { ssc: 'b', hsc: 'y', diploma: 's', ug: 'b' },
    { ssc: 'b', hsc: 'y', diploma: 's', ug: 'b' }
  ];

  const ieltsData = [
    { listeningScore: '...', readingScore: '...', writingScore: '...', speakingScore: '...', date: '...' }
  ];

  const pteData = [
    { listeningScore: '...', readingScore: '...', writingScore: '...', speakingScore: '...', date: '...' }
  ];

  const greData = [
    { verbalScore: '...', quantScore: '...', writingScore: '...', date: '...' }
  ];

  const satData = [
    { mathScore: '...', englishScore: '...', essayScore: '...', date: '...' }
  ];

  const gmatData = [
    { verbalScore: '...', quantScore: '...', writingScore: '...', date: '...' }
  ];

  const pt_name = apiData?.rows?.[0]?.pt_name;
  const pt_info = apiData?.rows?.[0]?.pt_info;
  const sc_careers = apiData?.rows?.[0]?.sc_careers;
  const sc_stream = apiData?.rows?.[0]?.sc_stream;
  const sc_subjects = apiData?.rows?.[0]?.sc_subjects;
  const additional_note = apiData?.rows?.[0]?.additional_note;


  return (
    <main id="main" className="main">
      
        <div>
          <br></br>
          {user.role === 'counsellor' && (          
          
          <div  style={{ display: "flex", justifyContent: "right" }}>
            <CButton  type="submit" color="primary" variant="outline">
              <Link to={"/assessment/" + id}>Edit assessment </Link>
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
      <h2>Academic Scores</h2>
      <table>
        <thead>
          <tr>
            <th colSpan="4">SSC</th>
            <th colSpan="4">HSC</th>
            <th colSpan="4">Diploma</th>
            <th colSpan="4">UG</th>
            <th>Actions</th>
          </tr>
          <tr>
            <th>Board</th>
            <th>Year of Passing</th>
            <th>Score</th>
            <th>Backlogs?</th>
            <th>Board</th>
            <th>Year of Passing</th>
            <th>Score</th>
            <th>Backlogs?</th>
            <th>University</th>
            <th>Year of Passing</th>
            <th>Score</th>
            <th>Backlogs?</th>
            <th>Board</th>
            <th>Year of Passing</th>
            <th>Score</th>
            <th>Backlogs?</th>
          </tr>
        </thead>
        <tbody>
          {academicData.map((data, index) => (
            <tr key={index}>
              <td>{data.ssc}</td>
              <td>{data.hsc}</td>
              <td>{data.diploma}</td>
              <td>{data.ug}</td>
              <td>...</td> {/* Edit and delete buttons */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* IELTS Scores Table */}
      <h2>IELTS Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Listening Score</th>
            <th>Reading Score</th>
            <th>Writing Score</th>
            <th>Speaking Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ieltsData.map((data, index) => (
            <tr key={index}>
              <td>{data.listeningScore}</td>
              <td>{data.readingScore}</td>
              <td>{data.writingScore}</td>
              <td>{data.speakingScore}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PTE Scores Table */}
      <h2>PTE Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Listening Score</th>
            <th>Reading Score</th>
            <th>Writing Score</th>
            <th>Speaking Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {pteData.map((data, index) => (
            <tr key={index}>
              <td>{data.listeningScore}</td>
              <td>{data.readingScore}</td>
              <td>{data.writingScore}</td>
              <td>{data.speakingScore}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* GRE Scores Table */}
      <h2>GRE Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Verbal Score</th>
            <th>Quant Score</th>
            <th>Writing Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {greData.map((data, index) => (
            <tr key={index}>
              <td>{data.verbalScore}</td>
              <td>{data.quantScore}</td>
              <td>{data.writingScore}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SAT Scores Table */}
      <h2>SAT Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Math Score</th>
            <th>English Score</th>
            <th>Essay Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {satData.map((data, index) => (
            <tr key={index}>
              <td>{data.mathScore}</td>
              <td>{data.englishScore}</td>
              <td>{data.essayScore}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* GMAT Scores Table */}
      <h2>GMAT Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Verbal Score</th>
            <th>Quant Score</th>
            <th>Writing Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {gmatData.map((data, index) => (
            <tr key={index}>
              <td>{data.verbalScore}</td>
              <td>{data.quantScore}</td>
              <td>{data.writingScore}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

          
        </div>
      
    </main>
  );
}

export default Record;
