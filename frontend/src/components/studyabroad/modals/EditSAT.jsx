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
import { updateSatScore } from "../helper";
import { satValidate } from "../validate";

const EditSAT = ({data, onClose}) => {

  const navigate = useNavigate();

  console.log(data.id);

  // Define formik forms for each tab
  const satForm = useFormik({
    initialValues: {
        sat_math_score: data?.sat_math_score || "",
      sat_english_score: data?.sat_english_score || "",
      sat_essay_score: data?.sat_essay_score || "",
      sat_overall: data?.sat_overall || "",
      sat_date: data?.sat_date || "",
    },
    enableReinitialize: true,
    validate: satValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

        let updatePromise = updateSatScore(values, data.id);

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
        <h4>Edit SAT Score</h4>
      <button
        type="button"
        className=" h-50 btn btn-sm btn-danger"
        onClick={onClose}
      >
        <span>X</span>
      </button>
    </div>
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
  </div>
  </div>
  );
};

export default EditSAT;
