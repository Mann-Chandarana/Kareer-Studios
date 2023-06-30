import React, { useRef, useState } from 'react';
import client from '../../../api/index';
import { toast } from 'react-toastify';

function GenerateReceipt() {
  const [receiptData, setReceiptData] = useState({
    student_id: '',
    serviceName: '',
    amount: '',
  });
  const formRef = useRef();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReceiptData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formRef.current.classList.add('was-validated');
    if (!formRef.current.checkValidity()) {
      return;
    }

    const toastId = toast.loading('Generating Payment link..');

    try {
      const payload = {
        student_id: receiptData.student_id,
        redirect_url: window.location.origin + '/payment/verify',
        purpose: receiptData.serviceName,
        amount: receiptData.amount,
        sendWhatsApp: true,
      };

      await client.post('/payment/create', payload);

      toast.update(toastId, {
        render: 'Link sent!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: 'Error: ' + err.message,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">Generate Receipt</li>
            </ol>
          </nav>
        </div>
        <section className="mt-4 d-flex align-items-center justify-content-center">
          <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
            <div style={{ background: '#4154f1' }} className="card-header ">
              <h5 className="card-title text-white mt-2" id="exampleModalLabel">
                Generate Receipt
              </h5>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit}
                className="p-4"
                noValidate
                ref={formRef}
              >
                <div className="mb-3">
                  <label htmlFor="student_id" className="form-label">
                    Student ID:
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    pattern="^[0-9]*$"
                    id="student_id"
                    min={1}
                    required
                    name="student_id"
                    onChange={handleChange}
                    value={receiptData.student_id}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid student id.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Service Name:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    required
                    name="serviceName"
                    onChange={handleChange}
                    value={receiptData.serviceName}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid service name.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount:
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="amount"
                    pattern="^[0-9]+$"
                    min={1}
                    required
                    name="amount"
                    onChange={handleChange}
                    value={receiptData.amount}
                  />
                  <div className="invalid-feedback">
                    Amount should be greater than 0.
                  </div>
                </div>

                <button
                  style={{ background: '#4154f1' }}
                  type="submit"
                  className="btn text-white"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default GenerateReceipt;
