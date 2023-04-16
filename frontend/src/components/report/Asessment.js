import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import client from "../../api";
import { assessmentValidate } from "./Helper/validate"
import { addReport, updateReport } from "./Helper/helper";
import useFetch from "../../hooks/useFetch";


function Assessment() {
  let { id } = useParams();

  // update report
  const [{apiData}] = useFetch(id);
  const navigate = useNavigate();

  console.log(apiData.rows[0].scp_leadership);

  const formik = useFormik({
    initialValues: {
      student_id: apiData?.rows?.[0]?.student_id || "",
      scp_leadership: apiData?.scp_leadership || "",
      scp_management: apiData?.scp_management || "",
      scp_bodybalance: apiData?.scp_bodybalance || "",
      scp_logic: apiData?.scp_logic || "",
      scp_bodymovement: apiData?.scp_bodymovement || "",
      scp_senses: apiData?.scp_senses || "",
      scp_rhythm: apiData?.scp_rhythm || "",
      scp_visual: apiData?.scp_visual || "",
      scp_observation: apiData?.scp_observation || "",
      scp_communication: apiData?.scp_communication || "",
      tp_right: apiData?.tp_right || "",
      tp_left: apiData?.tp_left || "",
      as_follower: apiData?.as_follower || "",
      as_experimental: apiData?.as_experimental || "",
      as_different: apiData?.as_different || "",
      as_thoughtful: apiData?.as_thoughtful || "",
      lc_auditory: apiData?.lc_auditory || "",
      lc_visual: apiData?.lc_visual || "",
      lc_physical: apiData?.lc_physical || "",
      wa_intelligent: apiData?.wa_intelligent || "",
      wa_emotional: apiData?.wa_emotional || "",
      wa_visionary: apiData?.wa_visionary || "",
      wa_creative: apiData?.wa_creative || "",
      wa_adverse: apiData?.wa_adverse || "",
      pt_name: apiData?.pt_name || "",
      pt_info: apiData?.pt_info || "",
      sc_careers: apiData?.sc_careers || "",
      sc_stream: apiData?.sc_stream || "",
      sc_subjects: apiData?.sc_subjects || "",
      additional_note: apiData?.additional_note || "",
    },
    
    enableReinitialize: true,
    //validate: assessmentValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      let addPromise = addReport(values);

      toast.promise(addPromise, {
        loading: "Adding...",
        success: <b>Added successfully...!</b>,
        error: <b>Could not update!</b>,
      });

      let updatePromise = updateReport(values);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Updated successfully...!</b>,
        error: <b>Could not update!</b>,
      });
    },
  });

  return (
    <main id="main" className="main">
      <br></br>
      <center>
        <h2>Assessment Report</h2>
      </center>
      <br></br>
      <CForm onSubmit={formik.handleSubmit}>
        <CFormLabel style={{ fontSize: "20px" }}>
          Study & Career Potential
        </CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Leadership</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_leadership')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Management</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_management')}/>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Body Balance</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_bodybalance')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Logic</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_logic')}/>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Body Movement</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_bodymovement')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Senses</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_senses')}/>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Rhythm</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_rhythm')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Visual</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_visual')}/>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Observation</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_observation')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Communication</CInputGroupText>
              <CFormInput {...formik.getFieldProps('scp_communication')}/>
            </CInputGroup>
          </CCol>
        </CRow>
        <br></br>

        <CFormLabel style={{ fontSize: "20px" }}>Thinking Pattern</CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Right</CInputGroupText>
              <CFormInput {...formik.getFieldProps('tp_right')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Left</CInputGroupText>
              <CFormInput {...formik.getFieldProps('tp_left')}/>
            </CInputGroup>
          </CCol>
        </CRow>

        <br></br>

        <CFormLabel style={{ fontSize: "20px" }}>Achievement Style</CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Follower</CInputGroupText>
              <CFormInput {...formik.getFieldProps('as_follower')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Experimental</CInputGroupText>
              <CFormInput {...formik.getFieldProps('as_experimental')}/>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Different</CInputGroupText>
              <CFormInput {...formik.getFieldProps('as_different')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Thoughtful</CInputGroupText>
              <CFormInput {...formik.getFieldProps('as_thoughful')}/>
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
              <CFormInput {...formik.getFieldProps('lc_auditory')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Visual</CInputGroupText>
              <CFormInput {...formik.getFieldProps('lc_visual')}/>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Physical</CInputGroupText>
              <CFormInput {...formik.getFieldProps('lc_physical')}/>
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
              <CFormInput {...formik.getFieldProps('wa_intelligent')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Emotional</CInputGroupText>
              <CFormInput {...formik.getFieldProps('wa_emotional')}/>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Visionary</CInputGroupText>
              <CFormInput {...formik.getFieldProps('wa_visionary')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Creative</CInputGroupText>
              <CFormInput {...formik.getFieldProps('wa_creative')}/>
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Adverse</CInputGroupText>
              <CFormInput {...formik.getFieldProps('wa_adverse')}/>
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
              <CFormTextarea {...formik.getFieldProps('pt_name')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Info.</CInputGroupText>
              <CFormTextarea {...formik.getFieldProps('pt_info')}/>
            </CInputGroup>
          </CCol>
        </CRow>

        <br></br>
        <CFormLabel style={{ fontSize: "20px" }}>Suggested Careers</CFormLabel>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Careers</CInputGroupText>
              <CFormTextarea {...formik.getFieldProps('sc_careers')}/>
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Stream</CInputGroupText>
              <CFormTextarea {...formik.getFieldProps('sc_stream')}/>
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Subjects</CInputGroupText>
              <CFormTextarea {...formik.getFieldProps('sc_subjects')}/>
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
              <CFormTextarea {...formik.getFieldProps('additional_note')}/>
            </CInputGroup>
          </CCol>
          <CCol></CCol>
        </CRow>

        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CButton type="submit" color="primary" variant="outline">
            Submit
          </CButton>
        </div>
      </CForm>
    </main>
  );
}

export default Assessment;
