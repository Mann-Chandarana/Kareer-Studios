import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { addSatScore } from "../helper";
import { satValidate } from "../validate";

const SAT = () => {
  let { id } = useParams();

  const navigate = useNavigate();

 
  const satForm = useFormik({
    initialValues: {
      sat_math_score: "",
      sat_english_score: "",
      sat_essay_score: "",
      sat_overall: "",
      sat_date: "",
    },
    enableReinitialize: true,
    validate: satValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      let addPromise = addSatScore(values, id);

      toast.promise(addPromise, {
        loading: "Adding...",
        success: <b>Added successfully...!</b>,
        error: <b>Could not add!</b>,
      });

      addPromise.then(function () {
        navigate(`/record/${id}`);
      });
    },
  });

 

  return (
   <>

       

<form onSubmit={satForm.handleSubmit}>
              {/* Render PTE form fields */}
              <br></br>
              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Math</CInputGroupText>
                    <CFormInput {...satForm.getFieldProps("sat_math_score")} />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>English</CInputGroupText>
                    <CFormInput
                      {...satForm.getFieldProps("sat_english_score")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Essay</CInputGroupText>
                    <CFormInput {...satForm.getFieldProps("sat_essay_score")} />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Overall</CInputGroupText>
                    <CFormInput
                      {...satForm.getFieldProps("sat_overall")}
                    />
                  </CInputGroup>
                </CCol>
                </CRow>
                <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput placeholder="DD/MM/YYYY" {...satForm.getFieldProps("sat_date")} />
                  </CInputGroup>
                </CCol>
                <CCol xs></CCol>
              </CRow>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <CButton type="submit" color="primary" variant="outline">
                  Submit
                </CButton>
              </div>
            </form>

          </>
  );
};

export default SAT;
