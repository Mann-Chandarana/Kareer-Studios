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
import { addPteScore } from "../helper";
import { pteValidate } from "../validate";

const PTE = () => {
  let { id } = useParams();

  const navigate = useNavigate();

 
  const pteForm = useFormik({
    initialValues: {
      pte_listening_score: "",
      pte_reading_score: "",
      pte_writing_score: "",
      pte_speaking_score: "",
      pte_overall: "",
      pte_date: "",
    },
    enableReinitialize: true,
    validate: pteValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      let addPromise = addPteScore(values, id);

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

       

      
<form onSubmit={pteForm.handleSubmit}>
              {/* Render PTE form fields */}
              <br></br>
              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Listening</CInputGroupText>
                    <CFormInput
                      {...pteForm.getFieldProps("pte_listening_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Reading</CInputGroupText>
                    <CFormInput
                      {...pteForm.getFieldProps("pte_reading_score")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Writing</CInputGroupText>
                    <CFormInput
                      {...pteForm.getFieldProps("pte_writing_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Speaking</CInputGroupText>
                    <CFormInput
                      {...pteForm.getFieldProps("pte_speaking_score")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
              <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Overall</CInputGroupText>
                    <CFormInput
                      {...pteForm.getFieldProps("pte_overall")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput placeholder="DD/MM/YYYY" {...pteForm.getFieldProps("pte_date")} />
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

export default PTE;
