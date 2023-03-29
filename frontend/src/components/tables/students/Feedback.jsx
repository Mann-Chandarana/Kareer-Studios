import React from 'react'

const Feedback = () => {
    return (
        <>
            <main id="main" className="d-flex align-items-center justify-content-center">
                <div class="mx-0 mx-sm-auto">
                    <div class="card">
                        <div style={{background:"#4154f1"}} class="card-header ">
                            <h5 class="card-title text-white mt-2" id="exampleModalLabel">Feedback request</h5>
                        </div>
                        <div class="modal-body">
                            <div class="text-center" style={{padding:"2rem"}}>
                                <i style={{color:"#4154f1"}}  class="far fa-file-alt fa-4x mb-3"></i>
                                <p>
                                    <strong>Give counsellor's feedback</strong>
                                </p>
                                <p>
                                    Have some ideas how to improve our product?
                                    <strong>Give us your feedback.</strong>
                                </p>
                            </div>


                            <form class="px-4" action="">
                                <p class="text-center"><strong>Your rating:</strong></p>

                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example1" />
                                    <label class="form-check-label" for="radio3Example1">
                                        Very good
                                    </label>
                                </div>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example2" />
                                    <label class="form-check-label" for="radio3Example2">
                                        Good
                                    </label>
                                </div>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example3" />
                                    <label class="form-check-label" for="radio3Example3">
                                        Medicore
                                    </label>
                                </div>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example4" />
                                    <label class="form-check-label" for="radio3Example4">
                                        Bad
                                    </label>
                                </div>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="radio" name="exampleForm" id="radio3Example5" />
                                    <label class="form-check-label" for="radio3Example5">
                                        Very bad
                                    </label>
                                </div>

                                <hr /> 

                                <label htmlFor='form4Example3' class="text-center w-100 mb-2"><strong>What could we improve?</strong></label>

                                <div class="form-outline mb-4">
                                    <textarea class="form-control" id="form4Example3" rows="4"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer text-end">
                            <button style={{background:"#4154f1"}}  type="button" class="btn text-white">Submit</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Feedback;