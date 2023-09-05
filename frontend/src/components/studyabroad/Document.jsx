import React, { useContext, useState, useEffect } from "react";
import client from "../../api";
import SessionContext from "../../contexts/SessionContext";
import useCaptialize from "../../hooks/useCaptialize";
import { CButton } from "@coreui/react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { TableLoading } from "../TableLoading";
import useSearch from "../../hooks/useSearch";

function Document() {
  const { user } = useContext(SessionContext);
  let { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  console.log(files);

  const getDocuments = async () => {
    try {
      const { data } = await client.get("/documents/" + id);
      if (data) {
        setFiles(data.programFile);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const formData = new FormData();

  const onFileUpload = async (file_id, event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }

    formData.set("file", file);
    formData.set("filename", file.name);

    const toastId = toast.loading("Uploading...");

    try {
      await client.post(`/documents/${id}/${file_id}`, formData);

      toast.update(toastId, {
        render: "Uploaded!",
        isLoading: false,
        type: "success",
        autoClose: 1000,
      });
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: err.message,
        isLoading: false,
        type: "error",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <main id="main" className="main">
        <br></br>

        <CButton type="submit" color="primary" variant="outline">
          <Link to={"/"}>Back</Link>
        </CButton>
        <br></br>
        <br></br>
        <div className="pagetitle">
          <b>
            <h1>DOCUMENTS</h1>
          </b>
          <br></br>
        </div>

        <section className="section dashboard">
          <div className="col-12">
            <div className="card top-selling overflow-auto">
              <div className="card-body pb-0">
                <br></br>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      {loading || (
                        <>
                          <th scope="col">ID</th>
                          <th scope="col">Document</th>
                          <th scope="col">File</th>
                          <th scope="col">Upload</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <TableLoading />
                    ) : (
                      <>
                        <tr>
                          <th scope="row">1</th>
                          <td>10th Mark sheet and Certificate</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              {files.doc1name !== null ? (
                                
                                    <a
                                      href={files.doc1url}
                                      download={files.doc1name}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                    <i
                                    style={{
                                      color: "red",
                                      cursor: "pointer",
                                      position: "relative",
                                      left: "5px",
                                    }}
                                    className="fa-sharp fa-regular fa-file-lines fa-lg"
                                  ></i>
                                  
                                    </a>
                                
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(1, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">2</th>
                          <td>12th Mark sheet and Certificate</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc2name !== null ? (
                                
                                <a
                                href={files.doc2url}
                                download={files.doc2name}
                                target="_blank"
                                rel="noreferrer"
                              >
                              <i
                              style={{
                                color: "red",
                                cursor: "pointer",
                                position: "relative",
                                left: "5px",
                              }}
                              className="fa-sharp fa-regular fa-file-lines fa-lg"
                            ></i>
                            
                              </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(2, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">3</th>
                          <td>
                            Bachelor’s Degree – All Mark sheets / Transcripts
                          </td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc3name !== null ? (
                               
                               <a
                               href={files.doc3url}
                               download={files.doc3name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(3, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">4</th>
                          <td>Degree Certificate or Provisional Degree </td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc4name !== null ? (
                               
                               <a
                               href={files.doc4url}
                               download={files.doc4name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(4, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">5</th>
                          <td>Backlog Summary Certificate (if any)</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc5name !== null ? (
                               
                               <a
                               href={files.doc5url}
                               download={files.doc5name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(5, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">6</th>
                          <td>Passport Copy – First & Last Page</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc6name !== null ? (
                                
                                <a
                                href={files.doc6url}
                                download={files.doc6name}
                                target="_blank"
                                rel="noreferrer"
                              >
                              <i
                              style={{
                                color: "red",
                                cursor: "pointer",
                                position: "relative",
                                left: "5px",
                              }}
                              className="fa-sharp fa-regular fa-file-lines fa-lg"
                            ></i>
                            
                              </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(6, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">7</th>
                          <td>
                            Letters of Recommendation – 3 (Professional LOR and
                            Academic LOR)
                          </td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc7name !== null ? (
                               
                               <a
                               href={files.doc7url}
                               download={files.doc7name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(7, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">8</th>
                          <td>Statement of Purpose</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc8name !== null ? (
                              
                              <a
                              href={files.doc8url}
                              download={files.doc8name}
                              target="_blank"
                              rel="noreferrer"
                            >
                            <i
                            style={{
                              color: "red",
                              cursor: "pointer",
                              position: "relative",
                              left: "5px",
                            }}
                            className="fa-sharp fa-regular fa-file-lines fa-lg"
                          ></i>
                          
                            </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(8, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">9</th>
                          <td>Resume</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc9name !== null ? (
                               
                               <a
                               href={files.doc9url}
                               download={files.doc9name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(9, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">10</th>
                          <td>IELTS or TOEFL</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc10name !== null ? (
                               
                               <a
                               href={files.doc10url}
                               download={files.doc10name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(10, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">11</th>
                          <td>Experience certificate – if any</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc11name !== null ? (
                               
                               <a
                               href={files.doc11url}
                               download={files.doc11name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(11, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">12</th>
                          <td>Photo passport size (If required)</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc12name !== null ? (
                               
                               <a
                               href={files.doc12url}
                               download={files.doc12name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(12, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">13</th>
                          <td>GRE / GMAT (If required)</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc13name !== null ? (
                               
                               <a
                               href={files.doc13url}
                               download={files.doc13name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(13, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">14</th>
                          <td>SAT / PTE (If required)</td>
                          <td>
                            <a href="" target="_blank" rel="noreferrer">
                              { files.doc14name !== null ? (
                               
                               <a
                               href={files.doc14url}
                               download={files.doc14name}
                               target="_blank"
                               rel="noreferrer"
                             >
                             <i
                             style={{
                               color: "red",
                               cursor: "pointer",
                               position: "relative",
                               left: "5px",
                             }}
                             className="fa-sharp fa-regular fa-file-lines fa-lg"
                           ></i>
                           
                             </a>
                              ) : (
                                <span className="fw-bold">No Item</span>
                              )}
                            </a>
                          </td>
                          <td>
                            <label
                              type="button"
                              className="btn text-black btn-warning"
                            >
                              <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                multiple={false}
                                onChange={(e) => onFileUpload(14, e)}
                                style={{ display: "none" }}
                              />
                              <i className="fa-solid fa-upload"></i>
                            </label>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Document;
