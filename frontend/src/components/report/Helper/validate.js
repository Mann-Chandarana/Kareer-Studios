import toast from 'react-hot-toast';


//validate password
export async function assessmentValidate(values) {


    console.log(values.scp_leadership);
    
    const errors = valueValidation({}, values);
    scpValidation(errors, values);
    tpValidation(errors, values);
    asValidation(errors, values);
    lcValidation(errors, values);
    waValidation(errors, values);
    
    return errors;
}


export async function valueValidation(errors = {}, values) {

    if(values.scp_leadership == null || values.scp_management == null || values.scp_bodybalance == null || values.scp_logic == null || values.scp_bodymovement == null || values.scp_senses == null || values.scp_rhythm == null || values.scp_visual == null || values.scp_observation == null || values.scp_communication == null || values.tp_right == '' || values.tp_left == '' || values.as_follower == null || values.as_experimental == null || values.as_different == null || values.as_thoughtful == null || values.lc_auditory == null || values.lc_visual == null || values.lc_physical == null || values.wa_intelligent == null || values.wa_emotional == null || values.wa_visionary == null || values.wa_creative == null || values.wa_adverse == null || values.pt_name == '' || values.pt_info == '' || values.sc_careers == '' || values.sc_stream == '' || values.sc_subjects == '' || values.additional_note == '') {

        errors.novalue = toast.error("Please fill all fields.");
    }

    else if(!isNaN(parseFloat(values.scp_leadership)) || !isNaN(parseFloat(values.scp_management)) || !isNaN(parseFloat(values.scp_bodybalance)) || !isNaN(parseFloat(values.scp_logic)) || !isNaN(parseFloat(values.scp_bodymovement)) || !isNaN(parseFloat(values.scp_senses)) || !isNaN(parseFloat(values.scp_rhythm)) || !isNaN(parseFloat(values.scp_visual)) || !isNaN(parseFloat(values.scp_observation)) || !isNaN(parseFloat(values.scp_communication))) {

        errors.invalid = toast.error("Please fill float data in all fields of study and career potential.");
    } 
    
    else if(isNaN(parseFloat(values.tp_right)) || isNaN(parseFloat(values.tp_left))) {
        errors.invalid = toast.error("Please fill string data in all fields of thinking pattern.");
    }

    else if(!isNaN(parseFloat(values.as_follower)) || !isNaN(parseFloat(values.as_experimental)) || !isNaN(parseFloat(values.as_different)) || !isNaN(parseFloat(values.as_thoughtful))) {
        errors.invalid = toast.error("Please fill float data in all fields of achievement style.");
    }

    else if(!isNaN(parseFloat(values.lc_auditory)) || !isNaN(parseFloat(values.lc_visual)) || !isNaN(parseFloat(values.lc_physical))) {
        errors.invalid = toast.error("Please fill float data in all fields of learning & communication.");
    }

    else if(!isNaN(parseFloat(values.wa_intelligent)) || !isNaN(parseFloat(values.wa_emotional)) || !isNaN(parseFloat(values.wa_visionary)) || !isNaN(parseFloat(values.wa_creative)) || !isNaN(parseFloat(values.wa_adverse))) {
        errors.invalid = toast.error("Please fill float data in all fields of work ability.");
    }

    else if(isNaN(parseFloat(values.pt_name)) || isNaN(parseFloat(values.pt_info))) {
        errors.invalid = toast.error("Please fill string data in all fields of personality type.");

    }

    else if(isNaN(parseFloat(values.sc_career)) || isNaN(parseFloat(values.sc_stream)) || isNaN(parseFloat(values.sc_subjects))) {
        errors.invalid = toast.error("Please fill string data in all fields of suggested careers.");
    }

    else if(isNaN(parseFloat(values.additional_note))) {
        errors.invalid = toast.error("Please fill string data in the field of additional note.");
    }

    return errors; 
}


export async function scpValidation(errors = {}, values){

    if(!values) {
        errors.username = toast.error("Username required.");
    }
    else if(values.username.includes(" ")){
        errors.username = toast.error("Invalid username.");
    }

    return errors; 
}


export async function tpValidation(errors = {}, values){

    // if((values.tp_right + values.tp_left) != 100) {
    //     errors.username = toast.error("Thinking pattern value doesn't equal 100.");
    // }

    return errors; 
}


export async function asValidation(errors = {}, values){
    

    return errors;
}


export async function lcValidation(errors = {}, values){
    

    return errors;
}


export async function waValidation(errors = {}, values){
    

    return errors;
}