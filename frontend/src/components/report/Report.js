import React from "react";
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
  CCarouselItem, CTable, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell, CTableBody
} from "@coreui/react";
import { Link, useParams } from "react-router-dom";

function Report() {

  let {id} = useParams();

  return (

    <main id="main" className="main">
    <div>
      <br></br>
      <center><button style={{width: '10%'}}><Link to={'/assessment/'+id}>Edit assessment</Link></button></center>
      <br></br>
      
      <center><h4 className="heading">ASSESSMENT REPORT</h4></center>
      <br></br>
      <center>
        <CCarousel
          controls
          indicators
          dark
          className="w-75"
        >
          <CCarouselItem>
            <CCard className="text-center">
              <CCardBody>
                <CCardTitle>Study & Career Potential - Extremely High</CCardTitle>
                <br></br>
                <center>
                  <SCP1chart />
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
                  <SCP2chart />
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
                  <SCP3chart />
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
                <CCardText>
                  
                </CCardText>
                <center>
                <TPchart />
                </center>
              </CCardBody>
            </CCard>
          </CCol> 
          
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>Achievement Style</CCardTitle>
                <CCardText>
                  
                </CCardText>
                <center>
                <ASchart />
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
                <CCardText>
                  
                </CCardText>
                <center>
                <LCchart />
                </center>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={6}>
            <CCard>
              <CCardBody>
                <CCardTitle>Work Ability</CCardTitle>
                <CCardText>
                  
                </CCardText>
                <center>
                <WAchart />
                </center>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <br></br>
        <CCard className="text-center w-75">
          <CCardHeader>Personality Type</CCardHeader>
          <CCardBody>
            <CCardTitle>STEADY (Assertive)</CCardTitle>
            <CCardText style={{ textAlign: "left" }}>
              
              You will be motivated by cooperation, opportunities to help and
              sincere appreciation, who prioritizes giving support,
              collaborating and maintaining stability. You are described as
              calm, patient, predictable, deliberate, stable and consistent and
              may be limited by being indecisive, overly accommodating, and a
              tendency to avoid change. You may fear change, loss of stability,
              and offending others. You always values loyalty, helping others
              and security. What you naturally do well... <br></br>
              <br></br>• You’re a natural ‘people person’ and enjoy helping
              other people succeed. <br></br>• You’re good at building
              relationships and networking – the key to your success. <br></br>•
              You get fulfilment from satisfying social needs like friendship,
              sense of belonging and community service. <br></br>• You’re a team
              player, loyal, easy to get along with, patient and reliable.{" "}
              <br></br>• You are happy to follow plans as part of a team, but
              not necessarily on your own. <br></br>• You are motivated by
              relationships, shared goals, community service and the common
              good.
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
      <CTableHeaderCell className="w-25" scope="col">Careers</CTableHeaderCell>
      <CTableHeaderCell className="w-25" scope="col">Stream</CTableHeaderCell>
      <CTableHeaderCell className="w-25" scope="col">Subjects</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    <CTableRow>
      <CTableDataCell style={{ textAlign: "left" }}>Leadership role<br></br>Managerial role</CTableDataCell>
      <CTableDataCell style={{ textAlign: "left" }}>Liberal Arts <br></br> - Management <br></br>- Psychology</CTableDataCell>
      <CTableDataCell style={{ textAlign: "left"}}>1.	General Management<br></br>
2.	Business Management<br></br>
3.	International Business <br></br>
4.	Sales & Marketing<br></br>
5.	Startups & Entrepreneurship<br></br>
6.	HR Management<br></br>
7.	Tourism Management<br></br>
8.	Event Management</CTableDataCell>
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
            DOER personality, can’t be successful in strategy making role. She must work with people, work for people to achieve highest level of job satisfaction. Communication skill is dormant and needs to be improve. Recommended “Design Thinking workshop” and “Theatre Activity” to improve problem solving ability and communication style. 
            </CCardText>
          </CCardBody>
        </CCard>

        <br></br>
      </center>
    </div>
    </main>
  );
}

export default Report;
