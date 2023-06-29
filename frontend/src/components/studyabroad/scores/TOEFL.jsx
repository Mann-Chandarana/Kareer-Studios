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
import { addToeflScore } from "../helper";
import { toeflValidate } from "../validate";

const TOEFL = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const toeflForm = useFormik({
    initialValues: {
      toefl_listening_score: "",
      toefl_reading_score: "",
      toefl_writing_score: "",
      toefl_speaking_score: "",
      toefl_overall: "",
      toefl_date: "",
    },
    enableReinitialize: true,
    validate: toeflValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      let addPromise = addToeflScore(values, id);

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
      <form onSubmit={toeflForm.handleSubmit}>
        {/* Render TOEFL form fields */}
        <br></br>
        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Listening</CInputGroupText>
              <CFormInput
                {...toeflForm.getFieldProps("toefl_listening_score")}
              />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Reading</CInputGroupText>
              <CFormInput {...toeflForm.getFieldProps("toefl_reading_score")} />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Writing</CInputGroupText>
              <CFormInput {...toeflForm.getFieldProps("toefl_writing_score")} />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Speaking</CInputGroupText>
              <CFormInput
                {...toeflForm.getFieldProps("toefl_speaking_score")}
              />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Overall</CInputGroupText>
              <CFormInput {...toeflForm.getFieldProps("toefl_overall")} />
            </CInputGroup>
          </CCol>
          <CCol xs>
            <CInputGroup className="mb-3">
              <CInputGroupText>Date</CInputGroupText>
              <CFormInput placeholder="DD/MM/YYYY" {...toeflForm.getFieldProps("toefl_date")} />
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

export default TOEFL;
