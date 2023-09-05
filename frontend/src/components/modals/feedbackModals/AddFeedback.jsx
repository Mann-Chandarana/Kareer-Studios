import React, { useRef, useState } from "react";
import SmallSpinner from "../../SmallSpinner";
import client from "../../../api";
import { toast } from "react-toastify";

const AddFeedback = ({ counsellor_id, Fetch_Feedback }) => {
  const closeButton = useRef();
  const inputField = useRef();

  const [feedback, setfeedback] = useState({
    student_id: "",
    counsellor_id: counsellor_id,
    performance: "",
    comments: "",
    status: false,
    start_date: "",
  });

  const [loading, setloading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setfeedback({ ...feedback, [name]: value });
  };

  const handleToggle = (e) => {
    setfeedback({ ...feedback, status: !feedback.status });
    formData.set("feedback",feedback.status)
  };

  const formData = new FormData();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formData.set("file", file);
    formData.set("fileName", file.name);
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    formData.set("student_id", feedback.student_id);
    formData.set("counsellor_id", feedback.counsellor_id);
    formData.set("comments", feedback.comments);
    formData.set("start_date", feedback.start_date);
    formData.set("performance",feedback.performance);

    try {
      const { data } = await client.get(
        "feedbacks/getCount/" + feedback.student_id
      );

      let obj = feedback;
      for (let [key, value] of Object.entries(feedback)) {
        obj.key = value;
      }
      obj.message = 0;

      if (data.message.messages !== null) {
        obj.message = data.message.messages;
        formData.set('message',parseInt(data.message.messages));
      }
      await client.post("/feedbacks/addCounsellorFeed", formData);
      closeButton.current.click();
      inputField.current.value = null
      Fetch_Feedback();
      setfeedback({
        student_id: "",
        counsellor_id: counsellor_id,
        performance: "",
        comments: "",
        status: false,
        start_data: "",
        pdf: null,
      });

      toast.success("Comment added successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  return (
    <form className="modal-content" noValidate onSubmit={handlesubmit}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          <p className="h3">Add Comment</p>
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
            <div className="floating-label-group">
              <label className="floating-label mb-1">Student ID</label>

              <input
                type="text"
                pattern="^[a-z A-Z]*$"
                name="student_id"
                value={feedback.student_id}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
                autoFocus
                required
              />
            </div>
            <div className="floating-label-group mt-2">
              <label className="floating-label ">Performance</label>
              <textarea
                className="form-control"
                style={{ fontSize: "14px", resize: "vertical" }}
                rows="2"
                name="performance"
                value={feedback.performance}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
                required
              ></textarea>
            </div>

            <div className="floating-label-group mt-2">
              <label className="floating-label ">Comments</label>
              <textarea
                className="form-control"
                style={{ fontSize: "14px", resize: "vertical" }}
                rows="2"
                name="comments"
                value={feedback.comments}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
                required
              ></textarea>
            </div>

            <div className="floating-label-group mt-3">
              <label className="form-check-label">Status: </label>
              <input
                onChange={handleToggle}
                checked={feedback.status}
                type="checkbox"
                name="status"
                autoComplete="off"
                className="form-check-input mx-1"
              />
            </div>

            <div className="floating-label-group mt-4">
              <label className=" form-check-label">Date: </label>
              <input
                onChange={handleChange}
                type="date"
                name="start_date"
                value={feedback.start_date}
                autoComplete="off"
                className="form-check-input mx-1"
                style={{ width: "8rem", height: "20px" }}
              />
            </div>

            <div className="floating-label-group mt-4">
              <label for="form-check-label" className="form-label">
                Upload attachment:
              </label>
              <input
                name="pdf"
                className="form-control-sm"
                type="file"
                style={{ marginLeft: "10px" }}
                ref={inputField}
                onChange={handleFileChange}
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
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? (
            <>
              Adding <SmallSpinner />
            </>
          ) : (
            "ADD"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddFeedback;
