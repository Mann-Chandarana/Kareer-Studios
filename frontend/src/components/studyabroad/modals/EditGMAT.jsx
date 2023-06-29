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
import { updateGmatScore } from "../helper";
import { gmatValidate } from "../validate";

const EditGMAT = ({data, onClose}) => {

  const navigate = useNavigate();

  console.log(data.id);

  // Define formik forms for each tab
  const gmatForm = useFormik({
    initialValues: {
        gmat_verbal_score: data?.gmat_verbal_score || "",
        gmat_quant_score: data?.gmat_quant_score || "",
        gmat_writing_score: data?.gmat_writing_score || "",
        gmat_overall: data?.gmat_overall || "",
        gmat_date: data?.gmat_date || "",     
    },
    enableReinitialize: true,
    validate: gmatValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

        let updatePromise = updateGmatScore(values, data.id);

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
        <h4>Edit GMAT Score</h4>
      <button
        type="button"
        className=" h-50 btn btn-sm btn-danger"
        onClick={onClose}
      >
        <span>X</span>
      </button>
    </div>
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
                    <CInputGroupText>Overall</CInputGroupText>
                    <CFormInput {...gmatForm.getFieldProps("gmat_overall")} />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput placeholder="DD/MM/YYYY" {...gmatForm.getFieldProps("gmat_date")}/>
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

export default EditGMAT;
