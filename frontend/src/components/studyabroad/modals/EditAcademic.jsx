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
import { updateAcademicScore } from "../helper";
import { academicValidate } from "../validate";

const EditAcademic = ({data, onClose}) => {

  let { id } = useParams();

  const navigate = useNavigate();

  // Define formik forms for each tab
  const academicForm = useFormik({
    initialValues: {
      ssc_board: data?.[0]?.ssc_board || "",
      ssc_school: data?.[0]?.ssc_school || "",
      ssc_year: data?.[0]?.ssc_year || "",
      ssc_score: data?.[0]?.ssc_score || "",
      ssc_type: data?.[0]?.ssc_type || "",
      ssc_backlog: data?.[0]?.ssc_backlog || "",

      hsc_board: data?.[0]?.hsc_score || "",
      hsc_school: data?.[0]?.hsc_school || "",
      hsc_year: data?.[0]?.hsc_year || "",
      hsc_score: data?.[0]?.hsc_score || "",
      hsc_type: data?.[0]?.hsc_type || "",
      hsc_backlog: data?.[0]?.hsc_backlog || "",

      diploma_uni: data?.[0]?.diploma_uni || "",
      diploma_college: data?.[0]?.diploma_college || "",
      diploma_year: data?.[0]?.diploma_year || "",
      diploma_score: data?.[0]?.diploma_score || "",
      diploma_type: data?.[0]?.diploma_type || "",
      diploma_backlog: data?.[0]?.diploma_backlog || "",

      ug_uni: data?.[0]?.ug_uni || "",
      ug_college: data?.[0]?.ug_college || "",
      ug_year: data?.[0]?.ug_year || "",
      ug_score: data?.[0]?.ug_score || "",
      ug_type: data?.[0]?.ug_type || "",
      ug_backlog: data?.[0]?.ug_backlog || "",
      // ... other academic fields
    },
    enableReinitialize: true,
    validate: academicValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

        let updatePromise = updateAcademicScore(values, id);

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
    <div className="bg-white p-4" style={{ maxWidth: "1000px", maxHeight: "575px", overflowY: "auto" }}>
    <div className="d-flex justify-content-between">
        <h4>Edit Academic Score</h4>
      <button
        type="button"
        className=" h-50 btn btn-sm btn-danger"
        onClick={onClose}
      >
        <span>X</span>
      </button>
    </div>
    <form onSubmit={academicForm.handleSubmit}>
    {/* Render academic form fields */}
    <br></br>

    <CFormLabel style={{ fontSize: "20px" }}>SSC</CFormLabel>
    <CRow>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Board</CInputGroupText>
          <CFormSelect {...academicForm.getFieldProps("ssc_board")}>
            <option value="" disabled selected>
              Select
            </option>
            <option value="IB">IB</option>
            <option value="GSEB">GSEB</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="IGCSE">IGCSE</option>
            <option value="NIOS">NIOS</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>School</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("ssc_school")} />
        </CInputGroup>
      </CCol>
    </CRow>

    <CRow>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Year of Passing</CInputGroupText>
          <CFormInput placeholder="YYYY" {...academicForm.getFieldProps("ssc_year")} />
        </CInputGroup>
      </CCol>

      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Score</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("ssc_score")} />
          <CInputGroupText>Type</CInputGroupText>
          <CFormSelect {...academicForm.getFieldProps("ssc_type")}>
          <option value="" disabled selected>
              Select
            </option>
            <option value="Percentage">Percentage</option>
            <option value="Percentile">Percentile</option>
            <option value="CGPA10">CGPA (10)</option>
            <option value="CGPA(4)">CGPA (4)</option>
          </CFormSelect>
          <CInputGroupText>Backlogs</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("ssc_backlog")} />
        </CInputGroup>
      </CCol>
    </CRow>
    <CFormLabel style={{ fontSize: "20px" }}>HSC</CFormLabel>
    <CRow>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Board</CInputGroupText>
          <CFormSelect {...academicForm.getFieldProps("hsc_board")}>
            <option value="" disabled selected>
              Select
            </option>
            <option value="IB">IB</option>
            <option value="GSEB">GSEB</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="IGCSE">IGCSE</option>
            <option value="NIOS">NIOS</option>
          </CFormSelect>
        </CInputGroup>
      </CCol>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>School</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("hsc_school")} />
        </CInputGroup>
      </CCol>
    </CRow>

    <CRow>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Year of passing</CInputGroupText>
          <CFormInput placeholder="YYYY" {...academicForm.getFieldProps("hsc_year")} />
        </CInputGroup>
      </CCol>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Score</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("hsc_score")} />
          <CInputGroupText>Type</CInputGroupText>
          <CFormSelect {...academicForm.getFieldProps("hsc_type")}>
          <option value="" disabled selected>
              Select
            </option>
            <option value="Percentage">Percentage</option>
            <option value="Percentile">Percentile</option>
            <option value="CGPA10">CGPA (10)</option>
            <option value="CGPA(4)">CGPA (4)</option>
          </CFormSelect>
          <CInputGroupText>Backlogs</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("hsc_backlog")} />
        </CInputGroup>
      </CCol>
    </CRow>

    <CFormLabel style={{ fontSize: "20px" }}>Diploma</CFormLabel>
    <CRow>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>University</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("diploma_uni")} />
        </CInputGroup>
      </CCol>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>College</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("diploma_college")} />
        </CInputGroup>
      </CCol>
    </CRow>

    <CRow>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Year of Passing</CInputGroupText>
          <CFormInput placeholder="YYYY" {...academicForm.getFieldProps("diploma_year")} />
        </CInputGroup>
      </CCol>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Score</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("diploma_score")} />
          <CInputGroupText>Type</CInputGroupText>
          <CFormSelect {...academicForm.getFieldProps("diploma_type")}>
          <option value="" disabled selected>
              Select
            </option>
            <option value="Percentage">Percentage</option>
            <option value="Percentile">Percentile</option>
            <option value="CGPA10">CGPA (10)</option>
            <option value="CGPA(4)">CGPA (4)</option>
          </CFormSelect>
          <CInputGroupText>Backlogs</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("diploma_backlog")} />
        </CInputGroup>
      </CCol>
    </CRow>

    <CFormLabel style={{ fontSize: "20px" }}>UG</CFormLabel>
    <CRow>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>University</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("ug_uni")} />
        </CInputGroup>
      </CCol>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>College</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("ug_college")} />
        </CInputGroup>
      </CCol>
    </CRow>

    <CRow>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Year of Passing</CInputGroupText>
          <CFormInput placeholder="YYYY" {...academicForm.getFieldProps("ug_year")} />
        </CInputGroup>
      </CCol>
      <CCol xs>
        <CInputGroup className="mb-3">
          <CInputGroupText>Score</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("ug_score")} />
          <CInputGroupText>Type</CInputGroupText>
          <CFormSelect {...academicForm.getFieldProps("ug_type")}>
          <option value="" disabled selected>
              Select
            </option>
            <option value="Percentage">Percentage</option>
            <option value="Percentile">Percentile</option>
            <option value="CGPA10">CGPA (10)</option>
            <option value="CGPA(4)">CGPA (4)</option>
          </CFormSelect>
          <CInputGroupText>Backlogs</CInputGroupText>
          <CFormInput {...academicForm.getFieldProps("ug_backlog")} />
        </CInputGroup>
      </CCol>
    </CRow>

    <br></br>
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

export default EditAcademic
