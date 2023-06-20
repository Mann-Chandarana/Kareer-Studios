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
import { addAcademicScore } from "../helper";
import { academicValidate } from "../validate";

const Academic = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [academicData, setacademicData] = useState([]);

  // get records
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: academicData } = await client(`/records/academic/${id}`);
        setacademicData(academicData.rows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const len = academicData.length;
  let flagAcademic = len > 0 ? true : false;
  console.log(flagAcademic);

  // Define formik forms for each tab
  const academicForm = useFormik({
    initialValues: {
      ssc_board: "",
      ssc_school: "",
      ssc_year: "",
      ssc_score: "",
      ssc_type: "",
      ssc_backlog: "",

      hsc_board: "",
      hsc_school: "",
      hsc_year: "",
      hsc_score: "",
      hsc_type: "",
      hsc_backlog: "",

      diploma_uni: "",
      diploma_college: "",
      diploma_year: "",
      diploma_score: "",
      diploma_type: "",
      diploma_backlog: "",

      ug_uni: "",
      ug_college: "",
      ug_year: "",
      ug_score: "",
      ug_type: "",
      ug_backlog: "",
      // ... other academic fields
    },
    enableReinitialize: true,
    validate: academicValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      if (!flagAcademic) {
        let addPromise = addAcademicScore(values, id);

        toast.promise(addPromise, {
          loading: "Adding...",
          success: <b>Added successfully...!</b>,
          error: <b>Could not add!</b>,
        });

        addPromise.then(function () {
          navigate(`/record/${id}`);
        });
      } else {
        toast.error("Data already exists.");
      }
    },
  });

  return (
    <>
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
                <option value="CGPA (10)">CGPA (10)</option>
                <option value="CGPA (4)">CGPA (4)</option>
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
                <option value="CGPA (10)">CGPA (10)</option>
                <option value="CGPA (4)">CGPA (4)</option>
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
                <option value="CGPA (10)">CGPA (10)</option>
                <option value="CGPA (4)">CGPA (4)</option>
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
                <option value="CGPA (10)">CGPA (10)</option>
                <option value="CGPA (4)">CGPA (4)</option>
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
    </>
  );
};

export default Academic;
