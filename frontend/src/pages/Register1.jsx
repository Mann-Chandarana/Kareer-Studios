import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './Kareer Stud.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const Register1 = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(id);

  const [show, setshow] = useState(false);

  const RegisterationBtn = () => {
    const { name, email, phone, mobileOtp, emailOtp } = user;
    if (name && email && phone && mobileOtp && emailOtp) {
      toast.success("Registeration Successful",{
        position:"top-center"
      });


      // fetch('http://localhost:8000/api/link/register/' + id);
    }
    if ((name && email && phone) && !(mobileOtp && emailOtp)) {
      toast.warning("Please fill the fields with valid OTP",{
        position:"top-center"
      })
    }
  }

  // 60 seconds Timer Code
  const [isStarted, setIsStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    let intervalId;

    if (isStarted && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsStarted(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isStarted, secondsLeft]);

  // states that stores user inputs
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    mobileOtp: "",
    emailOtp: ""
  })

  // On change handle 
  let name, value;
  const handleChange = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });

  }

  // Otp Handler
  const SendOtp = async () => {
    let { email, phone } = user;

    if (secondsLeft === 0) {
      setSecondsLeft(60);
      setIsStarted(true);
    } else {
      setIsStarted(!isStarted);
    }
    toast.success("OTP has been sent to your Email and Phone",{
      position:"top-center"
    })
    setshow(true);
    user.emailOtp = ""
    user.mobileOtp = ""

    try {
      const response = await axios.post('http://localhost:8000/api/otp/send', {
        email,
        phoneNumber: phone
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id);
    const { name, email, phone, mobileOtp, emailOtp } = user;
    try {
      await axios.post('http://localhost:8000/api/link/register/' + id,
      {
        name, email, phone, mobileOtp, emailOtp
      });
      console.log("Hello")
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  // Patterns for validations
  const showLink = (user.phone.length === 10) && (user.name.length >= 3) && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email));

  // Accepts only Numbers as an input
  const [mobileNumber, setMobileNumber] = useState('');

  function handleMobileNumberChange(event) {
    const { value } = event.target;
    setMobileNumber(value.replace(/\D/, '')); // remove non-digit characters
  }

  function handleMobileNumberKeyPress(event) {
    const charCode = event.which || event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  return (
    <>

      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="h-100 container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="p-md-5">
                  <div className="row justify-content-center">

                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" autoComplete='off' name="name" value={user.name} onChange={handleChange} required placeholder="Enter your Name" />
                            <label className="form-label" htmlFor="form3Example1c"></label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" autoComplete='off' name="email" value={user.email} onChange={handleChange} required placeholder="Enter your Email" />
                            <label className="form-label" htmlFor="form3Example3c"></label>
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input type="tel" id="form3Example4c" className="form-control" maxLength={10} autoComplete='off'
                              name="phone"
                              value={user.phone}
                              onChange={handleChange || handleMobileNumberChange}
                              onKeyPress={handleMobileNumberKeyPress}
                              placeholder="Enter your Phone number" required />
                            <label className="form-label" htmlFor="form3Example4c"></label>
                          </div>
                        </div>


                        <div className='form-outline flex-fill mb-0'>
                          {(secondsLeft !== 0) ? (show ? <input type="tel" id="form3Example4c OTP" className="form-control" maxLength={6} autoComplete='off' placeholder='Enter your Phone OTP here' required name="mobileOtp" value={user.mobileOtp}
                            onChange={handleChange || handleMobileNumberChange}
                            onKeyPress={handleMobileNumberKeyPress} /> : null) : null} <br />
                        </div>
                        <div className='form-outline flex-fill mb-0'>
                          {(secondsLeft !== 0) ? (show ? <input type="tel" id="form3Example4c OTP" className="form-control" maxLength={6} autoComplete='off' placeholder='Enter your Email OTP here' required name="emailOtp" value={user.emailOtp}
                            onChange={handleChange || handleMobileNumberChange}
                            onKeyPress={handleMobileNumberKeyPress} /> : null) : null} <br />
                        </div>
                        <div>
                          <center>{(secondsLeft !== 0) ? (show ? <p style={{ color: "red" }}>
                            {`Enter OTP in : ${secondsLeft} seconds`}</p> : null) : null}</center>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-3" id='OTPbtn'>
                          <center><h6><a onClick={SendOtp} style={{ cursor: "pointer", textDecoration: "none" }} className="OtpSender">
                            {((user.name && user.email && user.phone) === "") ? null : ((secondsLeft >= 1 && secondsLeft < 15)) ? null : (!(showLink)) ? null : "Send OTP"}
                          </a></h6></center>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg" onClick={RegisterationBtn}>Register</button>
                        </div>
                      </form>

                    </div>
                    <div className="KareerLogo">
                      <img src={logo} alt="img" style={{ maxWidth: "130px", display: "inline" }} />
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" style={{ marginTop: "5vh" }}
                        className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  )
}

export default Register1