import React, { useState } from 'react'
import axios from 'axios';
import logo from './Kareer Stud.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login2 = () => {
    const customstyle = {
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem"
    }

    const [input, setinput] = useState({
        email: "",
        password: ""
    })

    let name, value
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setinput({ ...input, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = input;
        if(!email || !password ){
            toast.warning("Please fill the Given Details",{
                position:"top-center"
            })
        }
        console.log(email,password)
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                email, 
                password,
            });
            localStorage.setItem('token', response.data.token);
            if(response){
                toast.success("Login Succesfull",{
                    position:"top-center"
                })
            }
            window.location.href = '/';
        } catch (error) {
            console.error(error);
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

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" autoComplete='off' name="email" value={input.email} onChange={handleChange} required placeholder="Enter your Email" />
                                                        <label className="form-label" htmlFor="form3Example3c"></label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example3c" className="form-control" autoComplete='off' name="password" value={input.password} onChange={handleChange} required placeholder="Enter Password" />
                                                        <label className="form-label" htmlFor="form3Example3c"></label>
                                                    </div>
                                                </div>
                                               
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-md"
                                                        style={customstyle} onClick={handleSubmit}>Login</button>
                                                </div>
                                            </form>

                                        </div>

                                        <div className="KareerLogo">
                                            <img src={logo} alt="img" style={{ maxWidth: "130px", display: "inline" }} />
                                        </div>

                                        <div className="col-md-9 col-lg-6 col-xl-5">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
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

export default Login2