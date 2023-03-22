import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../../api';
import SessionContext from '../../../contexts/SessionContext';
import '../../../styles/addparent.css';

function AddParent() {
    const { user, renewUser } = useContext(SessionContext);

    const navigate = useNavigate();

    const [parent, setParent] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
    });

    if (user.parent_added) {
        navigate('/');
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setParent((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        parent.student_id = user.id;
        console.log(parent);
        try {
            await client.post('/parents', parent);
            setParent({
                name: '',
                email: '',
                phone: '',
                gender: '',
            });
            await renewUser();
            navigate('/parent');
        } catch (error) {
            console.log({ error: error });
        }
    };

    return (
        <main id="main" className="d-flex align-items-center">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <h4 style={{ margin: '1rem 0', fontSize: '2rem' }}>Add parent</h4>
                        <div className="input-group input-group-icon">
                            <input
                                className="input_i"
                                onChange={handleChange}
                                name="name"
                                type="text"
                                placeholder="Enter your parent name"
                                value={parent.name}
                                required
                            />
                            <div className="input-icon">
                                <i className="fa fa-user icon"></i>
                            </div>
                        </div>
                        <div className="input-group input-group-icon">
                            <input
                                className="input_i"
                                onChange={handleChange}
                                name="email"
                                type="email"
                                placeholder="Enter your parent email"
                                value={parent.email}
                                required
                            />
                            <div className="input-icon">
                                <i className="fa fa-envelope"></i>
                            </div>
                        </div>
                        <div className="input-group input-group-icon">
                            <input
                                className="input_i"
                                onChange={handleChange}
                                value={parent.phone}
                                name="phone"
                                type="text"
                                placeholder="Enter your parent phone number"
                                required
                            />
                            <div className="input-icon">
                                <i className="fa fa-solid fa-phone icon"></i>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: '15px 0', marginLeft: '-10px' }} className="row">
                        <div className="col-half">
                            <h4>Gender</h4>
                            <div className="input-group">
                                <input
                                    className="input_i"
                                    onClick={handleChange}
                                    id="gender-male"
                                    type="radio"
                                    name="gender"
                                    value="male"
                                />
                                <label for="gender-male">Male</label>
                                <input
                                    className="input_i"
                                    onClick={handleChange}
                                    id="gender-female"
                                    type="radio"
                                    name="gender"
                                    value="female"
                                />
                                <label for="gender-female">Female</label>
                            </div>
                        </div>
                    </div>
                    <button style={{ marginLeft: '1px' }} type="Sumbit" className="btn btn-primary btn-md">
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
}

export default AddParent;
