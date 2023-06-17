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
import Academic from "./scores/Academic";
import IELTS from "./scores/IELTS";
import PTE from "./scores/PTE";
import GRE from "./scores/GRE";
import SAT from "./scores/SAT";
import GMAT from "./scores/GMAT";

const Score = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("academic");

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
            <Academic></Academic>
          </div>

          <div className={`tab-pane ${activeTab === "ielts" && "active"}`}>
            <IELTS></IELTS>
          </div>

          {/* Add tab content for PTE, GRE, SAT, and GMAT */}
          <div className={`tab-pane ${activeTab === "pte" && "active"}`}>
            <PTE></PTE>
          </div>

          <div className={`tab-pane ${activeTab === "gre" && "active"}`}>
            <GRE></GRE>
          </div>

          <div className={`tab-pane ${activeTab === "sat" && "active"}`}>
           <SAT></SAT>
          </div>

          <div className={`tab-pane ${activeTab === "gmat" && "active"}`}>
            <GMAT></GMAT>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Score;
