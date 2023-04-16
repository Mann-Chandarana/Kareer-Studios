import toast from 'react-hot-toast';


//validate password
export async function assessmentValidate(values) {

    const errors = scpValidation({}, values);
    tpValidation(errors, values);
    asValidation(errors, values);
    lcValidation(errors, values);
    waValidation(errors, values);
    
    return errors;
}



// validate register form
export async function scpValidation(errors = {}, values){

    // if(!values.scp) {
    //     errors.username = toast.error("Username required.");
    // }
    // else if(values.username.includes(" ")){
    //     errors.username = toast.error("Invalid username.");
    // }

    return errors; 
}

// validate register form
export async function tpValidation(errors = {}, values){

    // if((values.tp_right + values.tp_left) != 100) {
    //     errors.username = toast.error("Thinking pattern value doesn't equal 100.");
    // }

    return errors; 
}

// validate register form
export async function asValidation(errors = {}, values){
    

    return errors;
}

// validate register form
export async function lcValidation(errors = {}, values){
    

    return errors;
}

// validate register form
export async function waValidation(errors = {}, values){
    

    return errors;
}