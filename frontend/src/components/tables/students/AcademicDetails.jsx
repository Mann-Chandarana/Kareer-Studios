import React from 'react';

export const AcademicDetails = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <main id="main" className="d-flex align-items-center">
            <div className="container">
                <h4 style={{ margin: '1rem 0', fontSize: '2rem' }}>Academic Details</h4>
                <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="board">Board:</label>
                        <select id="board" className="form-select">
                            <option value="SSC" defaultChecked>
                                SSC
                            </option>
                            <option value="HSC">HSC</option>
                            <option value="CBSC">CBSC</option>
                            <option value="ICSE">ICSE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="std">Standard:</label>
                        <input type="number" className="form-control" id="std" placeholder="Enter your std" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="school-college">School/College:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="school-college"
                            placeholder="Enter your college name"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" style={{ width: 'fit-content' }}>
                        Add
                    </button>
                </form>
            </div>
        </main>
    );
};
