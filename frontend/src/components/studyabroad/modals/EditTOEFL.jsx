import React, { useContext, useState, useEffect } from "react";
import client from "../../../api";
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
  CFormSelect,
} from "@coreui/react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import useFetch from "../../../hooks/useFetch";
import { updateToeflScore } from "../helper";
import { toeflValidate } from "../validate";

const EditTOEFL = ({data, onClose}) => {

  const navigate = useNavigate();

  console.log(data.id);

  // Define formik forms for each tab
  const toeflForm = useFormik({
    initialValues: {
        toefl_listening_score: data?.toefl_listening_score || "",
      toefl_reading_score: data?.toefl_reading_score || "",
      toefl_writing_score: data?.toefl_writing_score || "",
      toefl_speaking_score: data?.toefl_speaking_score || "",
      toefl_overall: data?.toefl_overall || "",
      toefl_date: data?.toefl_date || "",   
    },
    enableReinitialize: true,
    validate: toeflValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

        let updatePromise = updateToeflScore(values, data.id);

        toast.promise(updatePromise, {
          loading: "Updating...",
          success: <b>Updated successfully...!</b>,
          error: <b>Could not update!</b>,
        });

        updatePromise.then(function () {
          onClose();
          window.location.reload();
        });
    },
  });
  

  return (
    <div className="modal position-fixed top-50 start-50 translate-middle bg-dark bg-opacity-25 w-100 h-100 d-flex align-items-center justify-content-center">
    <div className="bg-white p-4" style={{ maxWidth: "1000px", maxHeight: "500px", overflowY: "auto" }}>
    <div className="d-flex justify-content-between">
        <h4>Edit TOEFL Score</h4>
      <button
        type="button"
        className=" h-50 btn btn-sm btn-danger"
        onClick={onClose}
      >
        <span>X</span>
      </button>
    </div>
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
  </div>
  </div>
  );
};

export default EditTOEFL;
