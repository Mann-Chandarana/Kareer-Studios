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
import { addIeltsScore } from "../helper";
import { ieltsValidate } from "../validate";

const IELTS = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const ieltsForm = useFormik({
    initialValues: {
      ielts_listening_score: "",
      ielts_reading_score: "",
      ielts_writing_score: "",
      ielts_speaking_score: "",
      ielts_overall: "",
      ielts_date: "",
    },
    enableReinitialize: true,
    validate: ieltsValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      let addPromise = addIeltsScore(values, id);

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

       

      
            <form onSubmit={ieltsForm.handleSubmit}>
              {/* Render IELTS form fields */}
              <br></br>
              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Listening</CInputGroupText>
                    <CFormInput
                      {...ieltsForm.getFieldProps("ielts_listening_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Reading</CInputGroupText>
                    <CFormInput
                      {...ieltsForm.getFieldProps("ielts_reading_score")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Writing</CInputGroupText>
                    <CFormInput
                      {...ieltsForm.getFieldProps("ielts_writing_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Speaking</CInputGroupText>
                    <CFormInput
                      {...ieltsForm.getFieldProps("ielts_speaking_score")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
              <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Overall</CInputGroupText>
                    <CFormInput
                      {...ieltsForm.getFieldProps("ielts_overall")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput placeholder="DD/MM/YYYY" {...ieltsForm.getFieldProps("ielts_date")} />
                  </CInputGroup>
                </CCol>
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

export default IELTS;
