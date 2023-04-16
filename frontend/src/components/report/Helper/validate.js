import toast from 'react-hot-toast';


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

    else if(isNaN(parseFloat(values.scp_leadership)) || isNaN(parseFloat(values.scp_management)) || isNaN(parseFloat(values.scp_bodybalance)) || isNaN(parseFloat(values.scp_logic)) || isNaN(parseFloat(values.scp_bodymovement)) || isNaN(parseFloat(values.scp_senses)) || isNaN(parseFloat(values.scp_rhythm)) || isNaN(parseFloat(values.scp_visual)) || isNaN(parseFloat(values.scp_observation)) || isNaN(parseFloat(values.scp_communication))) {

        errors.invalid = toast.error("Please fill float data in all fields of study and career potential.");
    } 
    
    // else if(!isNaN(parseFloat(values.tp_right)) || !isNaN(parseFloat(values.tp_left))) {
    //     errors.invalid = toast.error("Please fill string data in all fields of thinking pattern.");
    // }

    else if(isNaN(parseFloat(values.as_follower)) || isNaN(parseFloat(values.as_experimental)) || isNaN(parseFloat(values.as_different)) || isNaN(parseFloat(values.as_thoughtful))) {
        errors.invalid = toast.error("Please fill float data in all fields of achievement style.");
    }

    else if(isNaN(parseFloat(values.lc_auditory)) || isNaN(parseFloat(values.lc_visual)) || isNaN(parseFloat(values.lc_physical))) {
        errors.invalid = toast.error("Please fill float data in all fields of learning & communication.");
    }

    else if(isNaN(parseFloat(values.wa_intelligent)) || isNaN(parseFloat(values.wa_emotional)) || isNaN(parseFloat(values.wa_visionary)) || isNaN(parseFloat(values.wa_creative)) || isNaN(parseFloat(values.wa_adverse))) {
        errors.invalid = toast.error("Please fill float data in all fields of work ability.");
    }

    else if(!isNaN(parseFloat(values.pt_name)) || !isNaN(parseFloat(values.pt_info))) {
        errors.invalid = toast.error("Please fill string data in all fields of personality type.");

    }

    else if(!isNaN(parseFloat(values.sc_career)) || !isNaN(parseFloat(values.sc_stream)) || !isNaN(parseFloat(values.sc_subjects))) {
        errors.invalid = toast.error("Please fill string data in all fields of suggested careers.");
    }

    else if(!isNaN(parseFloat(values.additional_note))) {
        errors.invalid = toast.error("Please fill string data in the field of additional note.");
    }

    return errors; 
}


export async function scpValidation(errors = {}, values){

    if(parseFloat(values.scp_leadership) + parseFloat(values.scp_management) + parseFloat(values.scp_bodybalance) + parseFloat(values.scp_logic) + parseFloat(values.scp_bodymovement) + parseFloat(values.scp_senses) + parseFloat(values.scp_rhythm) + parseFloat(values.scp_visual) + parseFloat(values.scp_observation) + parseFloat(values.scp_communication) != 100) {

        errors.scp = toast.error("Total of all fields in study and career potential is not equal to 100.");
    } 

    return errors; 
}


export async function tpValidation(errors = {}, values) {


    const format = /\d\d\s\+\s\dX/;

    if(!format.test(values.tp_right) || !format.test(values.tp_left)) {
        
        errors.tp = toast.error("The value in the fields of thinking pattern is not as follows, \"## + #X\".");

        return errors;
    }

    const right = (values.tp_right).trim().split(" + ");
    const tpr_val = right[0];
    const tpr_count = right[1];
    console.log(tpr_val);
    console.log(tpr_count);

    const left = (values.tp_left).trim().split(" + ");
    const tpl_val = left[0];
    const tpl_count = left[1];
    console.log(tpl_val);
    console.log(tpl_count);


    if((parseFloat(tpr_val) + parseFloat(tpl_val)) != 100) {

        errors.tp = toast.error("The thinking pattern field value total is not 100.");

    }

    else if(parseFloat(tpr_count) < 0 || parseFloat(tpr_count) > 5 ||parseFloat(tpl_count) < 0 || parseFloat(tpl_count) > 5) {

        errors.tp = toast.error("The count in thinking pattern field in not between 0 and 5.");
    }

    return errors; 
}


export async function asValidation(errors = {}, values){
    
    if(parseFloat(values.as_follower) + parseFloat(values.as_experimental) + parseFloat(values.as_different) + parseFloat(values.as_thoughtful) != 100) {

        errors.as = toast.error("Total of all fields in achievement style is not equal to 100.");
    } 

    return errors;
}


export async function lcValidation(errors = {}, values){

    if(parseFloat(values.lc_auditory) + parseFloat(values.lc_visual) + parseFloat(values.lc_physical) != 100) {

        errors.lc = toast.error("Total of all fields in learning and communication is not equal to 100.");
    } 
    

    return errors;
}


export async function waValidation(errors = {}, values){

    if(parseFloat(values.wa_intelligent) + parseFloat(values.wa_emotional) + parseFloat(values.wa_visionary) + parseFloat(values.wa_creative) + parseFloat(values.wa_adverse) != 100) {

        errors.wa = toast.error("Total of all fields in work ability is not equal to 100.");
    }     

    return errors;
}