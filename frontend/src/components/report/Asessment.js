import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import {
  CForm,
  CFormLabel,
  CFormCheck,
  CFormInput,
  CButton,
  CFormText,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
  CFormTextarea,
} from "@coreui/react";

function Assessment() {
  return (
    <main id="main" className="main">
      <center>
        <h1>Assessment Report</h1>
      </center>
      <br></br>
      <CForm>
        <CFormLabel style={{ fontSize: "20px" }}>
          Study & Career Potential
        </CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Leadership</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Management</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Body Balance</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Logic</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Body Movement</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Senses</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Rhythm</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Visual</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Observation</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Communication</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>
        <br></br>

        <CFormLabel style={{ fontSize: "20px" }}>Thinking Pattern</CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Right</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Left</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>

        <br></br>

        <CFormLabel style={{ fontSize: "20px" }}>Achievement Style</CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Follower</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Experimental</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Different</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Thoughtful</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>

        <br></br>

        <CFormLabel style={{ fontSize: "20px" }}>
          Learning & Communication
        </CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Auditory</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Visual</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Physical</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs></CCol>
        </CRow>

        <br></br>

        <CFormLabel style={{ fontSize: "20px" }}>Work Ability</CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Intelligent</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Emotional</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Visionary</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Creative</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Adverse</CInputGroupText>
              <CFormInput />
            </CInputGroup>
          </CCol>

          <CCol xs></CCol>
        </CRow>
        <br></br>

        <CFormLabel style={{ fontSize: "20px" }}>Personality Type</CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Name</CInputGroupText>
              <CFormTextarea />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Info.</CInputGroupText>
              <CFormTextarea />
            </CInputGroup>
          </CCol>
        </CRow>

        <br></br>
        <CFormLabel style={{ fontSize: "20px" }}>Suggested Careers</CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Careers</CInputGroupText>
              <CFormTextarea />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Stream</CInputGroupText>
              <CFormTextarea />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Subjects</CInputGroupText>
              <CFormTextarea />
            </CInputGroup>
          </CCol>
          <CCol></CCol>
        </CRow>

        <br></br>
        <CFormLabel style={{ fontSize: "20px" }}>Additional Note</CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Note</CInputGroupText>
              <CFormTextarea />
            </CInputGroup>
          </CCol>
          <CCol></CCol>
        </CRow>

        <br></br>
    <div style={{display: "flex", justifyContent: "center"}}>
        <CButton type="submit" color="primary" variant="outline">
          Submit
        </CButton>
        </div>
      </CForm>
      
    </main>
  );
}

export default Assessment;
