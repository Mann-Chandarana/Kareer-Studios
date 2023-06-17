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
  CFormTextarea,
} from "@coreui/react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import useFetch from "../../../hooks/useFetch";
import { addAcademicScore } from "../helper";

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
  let flagAcademic = (len>0) ? true : false;
  console.log(flagAcademic);

  // Define formik forms for each tab
  const academicForm = useFormik({
    initialValues: {
      ssc_board: "",
      ssc_year: "",
      ssc_score: "",
      ssc_backlog: "",

      hsc_board: "",
      hsc_year: "",
      hsc_score: "",
      hsc_backlog: "",

      diploma_uni: "",
      diploma_year: "",
      diploma_score: "",
      diploma_backlog: "",

      ug_uni: "",
      ug_year: "",
      ug_score: "",
      ug_backlog: "",
      // ... other academic fields
    },
    enableReinitialize: true,
    //validate: academicValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      if(!flagAcademic)
      {
        let addPromise = addAcademicScore(values, id);

        toast.promise(addPromise, {
          loading: "Adding...",
          success: <b>Added successfully...!</b>,
          error: <b>Could not add!</b>,
        });
  
        addPromise.then(function () {
          navigate(`/record/${id}`);
        });
      }

      else {
        toast.error("Data already exists.")
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
                    <CFormInput {...academicForm.getFieldProps("ssc_board")} />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Year of Passing</CInputGroupText>
                    <CFormInput {...academicForm.getFieldProps("ssc_year")} />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Score</CInputGroupText>
                    <CFormInput {...academicForm.getFieldProps("ssc_score")} />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Backlogs</CInputGroupText>
                    <CFormInput
                      {...academicForm.getFieldProps("ssc_backlog")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
              <CFormLabel style={{ fontSize: "20px" }}>HSC</CFormLabel>
              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Board</CInputGroupText>
                    <CFormInput {...academicForm.getFieldProps("hsc_board")} />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Year of passing</CInputGroupText>
                    <CFormInput {...academicForm.getFieldProps("hsc_year")} />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Score</CInputGroupText>
                    <CFormInput {...academicForm.getFieldProps("hsc_score")} />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Backlogs</CInputGroupText>
                    <CFormInput
                      {...academicForm.getFieldProps("hsc_backlog")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CFormLabel style={{ fontSize: "20px" }}>Diploma</CFormLabel>
              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>University</CInputGroupText>
                    <CFormInput
                      {...academicForm.getFieldProps("diploma_uni")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Year of Passing</CInputGroupText>
                    <CFormInput
                      {...academicForm.getFieldProps("diploma_year")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Score</CInputGroupText>
                    <CFormInput
                      {...academicForm.getFieldProps("diploma_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Backlogs</CInputGroupText>
                    <CFormInput
                      {...academicForm.getFieldProps("diploma_backlog")}
                    />
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
                    <CInputGroupText>Year of Passing</CInputGroupText>
                    <CFormInput {...academicForm.getFieldProps("ug_year")} />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Score</CInputGroupText>
                    <CFormInput {...academicForm.getFieldProps("ug_score")} />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
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
