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
import { updateIeltsScore } from "../helper";
import { ieltsValidate } from "../validate";

const EditIELTS = ({data, onClose}) => {

  const navigate = useNavigate();

  console.log(data.id);

  // Define formik forms for each tab
  const ieltsForm = useFormik({
    initialValues: {
        ielts_listening_score: data?.ielts_listening_score || "",
      ielts_reading_score: data?.ielts_reading_score || "",
      ielts_writing_score: data?.ielts_writing_score || "",
      ielts_speaking_score: data?.ielts_speaking_score || "",
      ielts_overall: data?.ielts_overall || "",
      ielts_date: data?.ielts_date || "",   
    },
    enableReinitialize: true,
    validate: ieltsValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

        let updatePromise = updateIeltsScore(values, data.id);

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
        <h4>Edit IELTS Score</h4>
      <button
        type="button"
        className=" h-50 btn btn-sm btn-danger"
        onClick={onClose}
      >
        <span>X</span>
      </button>
    </div>
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
  </div>
  </div>
  );
};

export default EditIELTS;
