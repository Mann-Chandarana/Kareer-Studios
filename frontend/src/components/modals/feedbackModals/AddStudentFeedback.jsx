import React, { useRef, useState } from "react";
import SmallSpinner from "../../SmallSpinner";
import client from "../../../api";
import { toast } from "react-toastify";

const AddFeedback = ({ counsellor_id, student_id, Fetch_Feedback }) => {
  const closeButton = useRef();

  const [feedback, setfeedback] = useState({
    student_id: student_id,
    counsellor_id: counsellor_id,
    comment: "",
    date: "",
    pdf: null,
  });

  const [loading, setloading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setfeedback({ ...feedback, [name]: value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    try {
      const { data } = await client.get(
        "feedbacks/getCounCount/" + feedback.counsellor_id
      );

      let obj = feedback;
      for (let [key, value] of Object.entries(feedback)) {
        obj.key = value;
      }
      obj.message = 0;

      if (data.message.messages !== null) {
        obj.message = data.message.messages;
      }

      await client.post("/feedbacks/student", obj);

      closeButton.current.click();
      setfeedback({
        student_id: student_id,
        counsellor_id: counsellor_id,
        comment: "",
        date: "",
        pdf: null,
      });
      toast.success("Comment added successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
      });
      Fetch_Feedback();
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  return (
    <>
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
                <div className="floating-label-group mt-2">
                  <label className="floating-label ">
                    Add Comment for your counsellor
                  </label>
                  <textarea
                    className="form-control"
                    style={{ fontSize: "14px", resize: "vertical" }}
                    rows="2"
                    name="comment"
                    value={feedback.comment}
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
                    value={feedback.date}
                    autoComplete="off"
                    className="form-check-input mx-1"
                    style={{ width: "8rem", height: "20px" }}
                  />
                </div>

                <div className="floating-label-group mt-4">
                  <label for="form-check-label" class="form-label">
                    Upload attachment:
                  </label>
                  <input
                    name="pdf"
                    value={feedback.pdf}
                    class="form-control-sm"
                    type="file"
                    style={{ marginLeft: "10px" }}
                    //   onChange={fileUpdate}
                  />
                </div>
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
    </>
  );
};

export default AddFeedback;
