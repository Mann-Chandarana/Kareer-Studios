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
// import { assessmentValidate } from "./Helper/validate"
// import { addReport, updateReport } from "./Helper/helper";
import useFetch from "../../hooks/useFetch";
import { addIeltsScore } from "./helper";

const Score = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("academic");

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
    onSubmit: (values) => {
      // Handle form submission for academic scores
      console.log("Academic Form Submitted:", values);
    },
  });

  const ieltsForm = useFormik({
    initialValues: {
      ielts_listening_score: "",
      ielts_reading_score: "",
      ielts_writing_score: "",
      ielts_speaking_score: "",
      ielts_date: "",
    },
    enableReinitialize: true,
    //validate: assessmentValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      let addPromise = addIeltsScore(values, id);

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

  const pteForm = useFormik({
    initialValues: {
      pte_listening_score: "",
      pte_reading_score: "",
      pte_writing_score: "",
      pte_speaking_score: "",
      pte_date: "",
    },
    onSubmit: (values) => {
      // Handle form submission for IELTS scores
      console.log("PTE Form Submitted:", values);
    },
  });

  const greForm = useFormik({
    initialValues: {
      gre_verbal_score: "",
      gre_quant_score: "",
      gre_writing_score: "",
      gre_date: "",
    },
    onSubmit: (values) => {
      // Handle form submission for IELTS scores
      console.log("GRE Form Submitted:", values);
    },
  });

  const satForm = useFormik({
    initialValues: {
      sat_math_score: "",
      sat_english_score: "",
      sat_essay_score: "",
      sat_date: "",
    },
    onSubmit: (values) => {
      // Handle form submission for IELTS scores
      console.log("SAT Form Submitted:", values);
    },
  });

  const gmatForm = useFormik({
    initialValues: {
      gmat_verbal_score: "",
      gmat_quant_score: "",
      gmat_writing_score: "",
      gmat_date: "",
    },
    onSubmit: (values) => {
      // Handle form submission for IELTS scores
      console.log("GMAT Form Submitted:", values);
    },
  });

  // Define similar formik forms for PTE, GRE, SAT, and GMAT

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  //   e.preventDefault();
  //   // Submit the form based on the active tab
  //   switch (activeTab) {
  //     case "academic":
  //       academicForm.handleSubmit();
  //       break;
  //     case "ielts":
  //       ieltsForm.handleSubmit();
  //       break;
  //     // Handle submission for other tabs
  //     case "pte":
  //       pteForm.handleSubmit();
  //       break;
  //     case "gre":
  //       greForm.handleSubmit();
  //       break;
  //     case "sat":
  //       satForm.handleSubmit();
  //       break;
  //     case "gmat":
  //       gmatForm.handleSubmit();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <main id="main" className="main">
      <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      
        <br></br>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <CButton type="submit" color="primary" variant="outline">
            <Link to={"/record/" + id}>Back </Link>
          </CButton>
          <br></br>
        </div>
        <br></br>

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "academic" && "active"}`}
              onClick={() => handleTabChange("academic")}
            >
              Academic
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "ielts" && "active"}`}
              onClick={() => handleTabChange("ielts")}
            >
              IELTS
            </button>
          </li>
          {/* Add tabs for PTE, GRE, SAT, and GMAT */}
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "pte" && "active"}`}
              onClick={() => handleTabChange("pte")}
            >
              PTE
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "gre" && "active"}`}
              onClick={() => handleTabChange("gre")}
            >
              GRE
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "sat" && "active"}`}
              onClick={() => handleTabChange("sat")}
            >
              SAT
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "gmat" && "active"}`}
              onClick={() => handleTabChange("gmat")}
            >
              GMAT
            </button>
          </li>
        </ul>

        <div className="tab-content">
          <div className={`tab-pane ${activeTab === "academic" && "active"}`}>
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
          </div>

          <div className={`tab-pane ${activeTab === "ielts" && "active"}`}>
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
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput {...ieltsForm.getFieldProps("ielts_date")} />
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

          {/* Add tab content for PTE, GRE, SAT, and GMAT */}
          <div className={`tab-pane ${activeTab === "pte" && "active"}`}>
            <form onSubmit={pteForm.handleSubmit}>
              {/* Render PTE form fields */}
              <br></br>
              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Listening</CInputGroupText>
                    <CFormInput
                      {...pteForm.getFieldProps("pte_listening_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Reading</CInputGroupText>
                    <CFormInput
                      {...pteForm.getFieldProps("pte_reading_score")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Writing</CInputGroupText>
                    <CFormInput
                      {...pteForm.getFieldProps("pte_writing_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Speaking</CInputGroupText>
                    <CFormInput
                      {...pteForm.getFieldProps("pte_speaking_score")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput {...pteForm.getFieldProps("pte_date")} />
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

          <div className={`tab-pane ${activeTab === "gre" && "active"}`}>
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
                    <CFormInput
                      {...greForm.getFieldProps("gre_quant_score")}
                    />
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
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput {...greForm.getFieldProps("gre_date")} />
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

          <div className={`tab-pane ${activeTab === "sat" && "active"}`}>
            <form onSubmit={satForm.handleSubmit}>
              {/* Render PTE form fields */}
              <br></br>
              <CRow>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Math</CInputGroupText>
                    <CFormInput
                      {...satForm.getFieldProps("sat_math_score")}
                    />
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
                    <CFormInput
                      {...satForm.getFieldProps("sat_essay_score")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Date</CInputGroupText>
                    <CFormInput {...satForm.getFieldProps("sat_date")} />
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

          <div className={`tab-pane ${activeTab === "gmat" && "active"}`}>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default Score;
