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
import { addGmatScore } from "../helper";

const GMAT = () => {
  let { id } = useParams();

  const navigate = useNavigate();

 
  const gmatForm = useFormik({
    initialValues: {
      gmat_verbal_score: "",
      gmat_quant_score: "",
      gmat_writing_score: "",
      gmat_date: "",
    },
    enableReinitialize: true,
    //validate: gmatValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      let addPromise = addGmatScore(values, id);

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

       
<form onSubmit={gmatForm.handleSubmit}>
              {/* Render GMAT form fields */}
              <br></br>
              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Verbal Reasoning</CInputGroupText>
                    <CFormInput
                      {...gmatForm.getFieldProps("gmat_verbal_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Quantitative Reasoning</CInputGroupText>
                    <CFormInput
                      {...gmatForm.getFieldProps("gmat_quant_score")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Analytical Writing</CInputGroupText>
                    <CFormInput
                      {...gmatForm.getFieldProps("gmat_writing_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput {...gmatForm.getFieldProps("gmat_date")} />
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

export default GMAT;
