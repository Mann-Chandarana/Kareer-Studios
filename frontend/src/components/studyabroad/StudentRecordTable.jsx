import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../../contexts/SessionContext";
import client from "../../api";
import ModalButton from "../ModalButton";
import { TableLoading } from "../TableLoading";
import useSearch from "../../hooks/useSearch";
import SmallSpinner from "../SmallSpinner";

function StudentRecordTable() {
  const { user } = useContext(SessionContext);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dummy, setDummy, handleQueryChange } = useSearch(students);

  const getStudents = async () => {
    try {
      const { data } = await client.get("/students/counsellor/" + user.id);
      if (data.rowCount > 0) {
        setStudents(data.rows);
        setDummy(data.rows);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
            <br></br>
          <h1>Student Records</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Study Abroad</li>
              <li className="breadcrumb-item active">Students</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="col-12">
            <div className="card top-selling overflow-auto">
              <div className="filter d-flex align-items-center"></div>
              <div className="card-body pb-0">
                <h5 className="card-title">
                  <span style={{ fontSize: "14px" }}>
                    Total students:{" "}
                    {loading ? <SmallSpinner /> : students.length}
                  </span>
                </h5>

                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      {loading || (
                        <>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Member since</th>
                          <th scope="col">Info</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <TableLoading />
                    ) : (
                      dummy.map((student) => {
                        student.counsellor_name = user.name;
                        return (
                          <tr key={student.id}>
                            <th scope="row">{student.id}</th>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>
                              {new Date(student.createdat).toLocaleDateString()}
                            </td>

                            <td>
                              <ModalButton
                                className="btn btn-sm btn-info"
                              > <Link to={"/record/" + student.id} className="text-white">View </Link>
                              </ModalButton>
                            </td>
                          </tr>
                        );
                      })
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

export default StudentRecordTable;
