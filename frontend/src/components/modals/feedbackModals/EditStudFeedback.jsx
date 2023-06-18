import React, { useRef, useState } from "react";
import client from "../../../api";
import SmallSpinner from "../../SmallSpinner";

const EditStudFeedback = ({id,comment,date,Fetch_Feedback}) => {
  const closeButton = useRef();
  const [obj, setobj] = useState({
    id: id,
    comment:comment,
    date:date
  });
  const [loading, setloading] = useState(false);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setobj({ ...obj, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    try {
      await client.patch("/feedbacks/updateStudentFeed", obj);
      closeButton.current.click();
      Fetch_Feedback();
    } catch (err) {
      console.log({ error: err.message });
    }
    setloading(false);
  };

  const handleToggle = (e) => {
    setobj({...obj,status:!obj.status})
};

  return (
    <form className="modal-content" noValidate onSubmit={handleSubmit}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          <p className="h3">Edit Feedback</p>
        </h5>
        <button
          type="button"
          className="close btn btn-sm btn-danger"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">X</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            
            <div className="floating-label-group mt-2">
              <label className="floating-label ">Comment</label>
              <textarea
                className="form-control"
                style={{ fontSize: "14px", resize: "vertical" }}
                rows="2"
                name="comment"
                value={obj.comment}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
                required
              ></textarea>
            </div>

            <div className="floating-label-group mt-4">
              <label className=" form-check-label">Date: </label>
              <input
                onChange={handleChange}
                type="date"
                name="date"
                value={obj.date}
                autoComplete="off"
                className="form-check-input mx-1"
                style={{ width: "8rem", height: "20px" }}
              />
            </div>
            
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          ref={closeButton}
        >
          Close
        </button>
        <button type="submit" className="btn btn-warning" disabled={loading}>
          {loading ? (
            <>
              Updating <SmallSpinner />
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditStudFeedback;
