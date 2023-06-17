import React, { useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';
import useCaptialize from '../../hooks/useCaptialize';
import ASchart from "./Charts/ASchart";
import LCchart from "./Charts/LCchart";
import WAchart from "./Charts/WAchart";
import TPchart from "./Charts/TPchart";
import SCP1chart from "./Charts/SCP1chart";
import SCP2chart from "./Charts/SCP2chart";
import SCP3chart from "./Charts/SCP3chart";
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

function Report() {

  const { user } = useContext(SessionContext);
  let { id } = useParams();

  // get report
  let flag = false;
  const [{ apiData }] = useFetch(id);
  if (apiData) {
    flag = true;
  }

  const pt_name = apiData?.rows?.[0]?.pt_name;
  const pt_info = apiData?.rows?.[0]?.pt_info;
  const sc_careers = apiData?.rows?.[0]?.sc_careers;
  const sc_stream = apiData?.rows?.[0]?.sc_stream;
  const sc_subjects = apiData?.rows?.[0]?.sc_subjects;
  const additional_note = apiData?.rows?.[0]?.additional_note;


  return (
    <main id="main" className="main">
      {flag ? (
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
            <h4 className="heading">ASSESSMENT REPORT</h4>
          </center>
          <br></br>
          <center>
            <CCarousel controls indicators dark className="w-75">
              <CCarouselItem>
                <CCard className="text-center">
                  <CCardBody>
                    <CCardTitle>
                      Study & Career Potential - Extremely High
                    </CCardTitle>
                    <br></br>
                    <center>
                      <SCP1chart id={id} />
                    </center>
                    <br></br>
                    <br></br>
                  </CCardBody>
                </CCard>
              </CCarouselItem>
              <CCarouselItem>
                <CCard className="text-center">
                  <CCardBody>
                    <CCardTitle>Study & Career Potential - High</CCardTitle>
                    <br></br>
                    <center>
                      <SCP2chart id={id} />
                    </center>
                    <br></br>
                    <br></br>
                  </CCardBody>
                </CCard>
              </CCarouselItem>
              <CCarouselItem>
                <CCard className="text-center">
                  <CCardBody>
                    <CCardTitle>Study & Career Potential - Average</CCardTitle>
                    <br></br>
                    <center>
                      <SCP3chart id={id} />
                    </center>
                    <br></br>
                    <br></br>
                  </CCardBody>
                </CCard>
              </CCarouselItem>
            </CCarousel>

            <br></br>
            <CRow className="text-center w-75">
              <CCol sm={6}>
                <CCard>
                  <CCardBody>
                    <CCardTitle>Thinking Pattern</CCardTitle>
                    <CCardText></CCardText>
                    <center>
                      <TPchart id={id} />
                    </center>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol sm={6}>
                <CCard>
                  <CCardBody>
                    <CCardTitle>Achievement Style</CCardTitle>
                    <CCardText></CCardText>
                    <center>
                      <ASchart id={id} />
                    </center>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <br></br>
            <CRow className="text-center w-75">
              <CCol sm={6}>
                <CCard>
                  <CCardBody>
                    <CCardTitle>Learning & Communication</CCardTitle>
                    <CCardText></CCardText>
                    <center>
                      <LCchart id={id} />
                    </center>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm={6}>
                <CCard>
                  <CCardBody>
                    <CCardTitle>Work Ability</CCardTitle>
                    <CCardText></CCardText>
                    <center>
                      <WAchart id={id} />
                    </center>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <br></br>
            <CCard className="text-center w-75">
              <CCardHeader>Personality Type</CCardHeader>
              <CCardBody>
                <CCardTitle>{pt_name}</CCardTitle>
                <CCardText style={{ textAlign: "left" }}>{pt_info}
                </CCardText>
              </CCardBody>
            </CCard>

            <br></br>
            <CCard className="text-center w-75">
              <CCardHeader>Suggested Careers</CCardHeader>
              <CCardBody>
                <CTable hover bordered>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className="w-25" scope="col">
                        Careers
                      </CTableHeaderCell>
                      <CTableHeaderCell className="w-25" scope="col">
                        Stream
                      </CTableHeaderCell>
                      <CTableHeaderCell className="w-25" scope="col">
                        Subjects
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell style={{ textAlign: "left" }}>
                        {sc_careers}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: "left" }}>
                        {sc_stream}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: "left" }}>
                        {sc_subjects}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
            <br></br>

            <CCard className="text-center w-75">
              <CCardHeader>Additional Note</CCardHeader>
              <CCardBody>
                <CCardText style={{ textAlign: "left" }}>
                  {additional_note}
                </CCardText>
              </CCardBody>
            </CCard>

            <br></br>
          </center>
        </div>
      ) : (
        <div>
          <br></br>
          {user.role === 'counsellor' && ( 

          <div style={{ display: "flex", justifyContent: "right" }}>
            <CButton type="submit" color="primary" variant="outline">
              <Link to={"/assessment/" + id}>Add assessment</Link>
            </CButton>
            <br></br>
          </div>
          
          )}
          <br></br>

          <center>
            <h4 className="heading">ASSESSMENT REPORT</h4>
          </center>
          <br></br>
          <center>
            <p>Report for user does not exist, please add one.</p>
          </center>
        </div>
      )}
    </main>
  );
}

export default Report;
