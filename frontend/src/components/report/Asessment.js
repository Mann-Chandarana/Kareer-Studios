import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import {
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
  CFormTextarea,
} from "@coreui/react";
import { assessmentValidate } from "./Helper/validate"
import { addReport, updateReport } from "./Helper/helper";
import useFetch from "../../hooks/useFetch";


function Assessment() {

  let { id } = useParams();

  // get report
  let flag = false;
  const [{apiData}] = useFetch(id, 'report');
  if (apiData) {
    flag = true;
  
  }
  console.log(flag);

  const navigate = useNavigate();

  ///console.log(apiData.rows[0]);

  const formik = useFormik({
    initialValues: {
      student_id: apiData?.rows?.[0]?.rows?.[0]?.student_id || "",
      scp_leadership: apiData?.rows?.[0]?.scp_leadership || "",
      scp_management: apiData?.rows?.[0]?.scp_management || "",
      scp_bodybalance: apiData?.rows?.[0]?.scp_bodybalance || "",
      scp_logic: apiData?.rows?.[0]?.scp_logic || "",
      scp_bodymovement: apiData?.rows?.[0]?.scp_bodymovement || "",
      scp_senses: apiData?.rows?.[0]?.scp_senses || "",
      scp_rhythm: apiData?.rows?.[0]?.scp_rhythm || "",
      scp_visual: apiData?.rows?.[0]?.scp_visual || "",
      scp_observation: apiData?.rows?.[0]?.scp_observation || "",
      scp_communication: apiData?.rows?.[0]?.scp_communication || "",
      tp_right: apiData?.rows?.[0]?.tp_right || "",
      tp_left: apiData?.rows?.[0]?.tp_left || "",
      as_follower: apiData?.rows?.[0]?.as_follower || "",
      as_experimental: apiData?.rows?.[0]?.as_experimental || "",
      as_different: apiData?.rows?.[0]?.as_different || "",
      as_thoughtful: apiData?.rows?.[0]?.as_thoughtful || "",
      lc_auditory: apiData?.rows?.[0]?.lc_auditory || "",
      lc_visual: apiData?.rows?.[0]?.lc_visual || "",
      lc_physical: apiData?.rows?.[0]?.lc_physical || "",
      wa_intelligent: apiData?.rows?.[0]?.wa_intelligent || "",
      wa_emotional: apiData?.rows?.[0]?.wa_emotional || "",
      wa_visionary: apiData?.rows?.[0]?.wa_visionary || "",
      wa_creative: apiData?.rows?.[0]?.wa_creative || "",
      wa_adverse: apiData?.rows?.[0]?.wa_adverse || "",
      pt_name: apiData?.rows?.[0]?.pt_name || "",
      pt_info: apiData?.rows?.[0]?.pt_info || "",
      sc_careers: apiData?.rows?.[0]?.sc_careers || "",
      sc_stream: apiData?.rows?.[0]?.sc_stream || "",
      sc_subjects: apiData?.rows?.[0]?.sc_subjects || "",
      additional_note: apiData?.rows?.[0]?.additional_note || "",
    },
    
    enableReinitialize: true,
    validate: assessmentValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      if(flag == false) 
      {
        let addPromise = addReport(values, id);

        toast.promise(addPromise, {
          loading: "Adding...",
          success: <b>Added successfully...!</b>,
          error: <b>Could not add!</b>,
        });

        addPromise.then(function(){ 
          navigate(`/report/${id}`) 
        });

      }
      
      if(flag == true) {
        let updatePromise = updateReport(values, id);

        toast.promise(updatePromise, {
          loading: "Updating...",
          success: <b>Updated successfully...!</b>,
          error: <b>Could not update!</b>,
        });

        updatePromise.then(function(){ 
          navigate(`/report/${id}`) 
        });

      }
    },
  });

  return (
    <main id="main" className="main">

      <Toaster position="top-center" reverseOrder={false}></Toaster>
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
              <CFormInput {...formik.getFieldProps('as_thoughtful')}/>
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
