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
import { addGreScore } from "../helper";
import { greValidate } from "../validate";

const GRE = () => {
  let { id } = useParams();

  const navigate = useNavigate();

 
  const greForm = useFormik({
    initialValues: {
      gre_verbal_score: "",
      gre_quant_score: "",
      gre_writing_score: "",
      gre_overall: "",
      gre_date: "",
    },
    enableReinitialize: true,
    validate: greValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      let addPromise = addGreScore(values, id);

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

       

<form onSubmit={greForm.handleSubmit}>
              {/* Render GRE form fields */}
              <br></br>
              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Verbal Reasoning</CInputGroupText>
                    <CFormInput
                      {...greForm.getFieldProps("gre_verbal_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Quantitative Reasoning</CInputGroupText>
                    <CFormInput {...greForm.getFieldProps("gre_quant_score")} />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Analytical Writing</CInputGroupText>
                    <CFormInput
                      {...greForm.getFieldProps("gre_writing_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Overall</CInputGroupText>
                    <CFormInput {...greForm.getFieldProps("gre_overall")} />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput placeholder="DD/MM/YYYY"
                      {...greForm.getFieldProps("gre_date")}
                    />
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

export default GRE;
