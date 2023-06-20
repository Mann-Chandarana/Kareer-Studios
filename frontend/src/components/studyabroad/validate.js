import toast from 'react-hot-toast';

export async function academicValidate(values) {
    
    const errors = valueValidation({}, values, 'academic');
    console.log(errors);
    
    return errors;
}

export async function ieltsValidate(values) {

    const errors = valueValidation({}, values, 'ielts');
    console.log(errors);
    
    return errors;
}

export async function pteValidate(values) {

    const errors = valueValidation({}, values, 'pte');
    console.log(errors);
    
    return errors;
}

export async function greValidate(values) {

    const errors = valueValidation({}, values, 'gre');
    console.log(errors);
    
    return errors;
}

export async function satValidate(values) {

    const errors = valueValidation({}, values, 'sat');
    console.log(errors);
    
    return errors;
}

export async function gmatValidate(values) {

    const errors = valueValidation({}, values, 'gmat');
    console.log(errors);
    
    return errors;
}

export async function toeflValidate(values) {

    const errors = valueValidation({}, values, 'toefl');
    console.log(errors);
    
    return errors;
}


function valueValidation(errors = {}, values, type) {

    const format = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

    if(type === 'academic') {

        if(!isNaN(parseFloat(values.ssc_school)) || !isNaN(parseFloat(values.hsc_school)) || !isNaN(parseFloat(values.diploma_uni)) || !isNaN(parseFloat(values.ug_uni)) || !isNaN(parseFloat(values.diploma_college)) || !isNaN(parseFloat(values.ug_college))) {
        
            errors.invalid = toast.error("Please entire string value in school/college/university name.");  
        }

        if((values.ssc_backlog != '' && isNaN(parseInt(values.ssc_backlog))) || (values.hsc_backlog != '' && isNaN(parseInt(values.hsc_backlog))) || (values.diploma_backlog != '' && isNaN(parseInt(values.diploma_backlog))) || (values.ug_backlog != '' && isNaN(parseInt(values.ug_backlog)))) {
        
            errors.invalid = toast.error("Please entire a number in the backlog field.");  
        }
        
    }

    else if(type === 'ielts') {

        if(values.ielts_listening_score == null || values.ielts_reading_score == null || values.ielts_writing_score == null || values.ielts_speaking_score == null || values.ielts_overall == null || values.ielts_date == '') {

            errors.novalue = toast.error("Please fill all fields.");
        }

        else if(parseFloat(values.ielts_listening_score) < 0 || parseFloat(values.ielts_listening_score) > 9 || parseFloat(values.ielts_reading_score) < 0 || parseFloat(values.ielts_reading_score) > 9 || parseFloat(values.ielts_writing_score) < 0 || parseFloat(values.ielts_writing_score) > 9 || parseFloat(values.ielts_speaking_score) < 0 || parseFloat(values.ielts_speaking_score) > 9 || parseFloat(values.ielts_overall) < 0 || parseFloat(values.ielts_overall) > 9) {
            
            errors.invalid = toast.error("Make sure the values are between 0-9.");
        }        

        else if(!format.test(values.ielts_date)) {
        
            errors.invalid = toast.error("Make sure the date is in DD/MM/YYYY format.");
        }

    }

    else if(type === 'pte') {

        
        if(values.pte_listening_score == null || values.pte_reading_score == null || values.pte_writing_score == null || values.pte_speaking_score == null || values.pte_overall == null || values.pte_date == '') {

            errors.novalue = toast.error("Please fill all fields.");
        }

        else if(parseInt(values.pte_listening_score) < 0 || parseInt(values.pte_listening_score) > 90 || parseInt(values.pte_reading_score) < 0 || parseInt(values.pte_reading_score) > 90 || parseInt(values.pte_writing_score) < 0 || parseInt(values.pte_writing_score) > 90 || parseInt(values.pte_speaking_score) < 0 || parseInt(values.pte_speaking_score) > 90 || parseInt(values.pte_overall) < 0 || parseInt(values.pte_overall) > 90) {
            
            errors.invalid = toast.error("Make sure the values are between 0-90.");
        }        

        else if(!format.test(values.pte_date)) {
        
            errors.invalid = toast.error("Make sure the date is in DD/MM/YYYY format.");
        }

    }

    else if(type === 'gre') {

        if(values.gre_verbal_score == null || values.gre_quant_score == null || values.gre_writing_score == null || values.gre_overall == null || values.gre_date == '') {

            errors.novalue = toast.error("Please fill all fields.");
        }

        else if(parseInt(values.gre_verbal_score) < 130 || parseInt(values.gre_verbal_score) > 170 || parseInt(values.gre_quant_score) < 130 || parseInt(values.gre_quant_score) > 170 || parseFloat(values.gre_writing_score) < 0 || parseFloat(values.gre_writing_score) > 6 || parseInt(values.gre_overall) < 260 || parseInt(values.gre_overall) > 340) {
            
            errors.invalid = toast.error("Make sure the values are between 130-170, between 0-6 for writing and between 260-340 for overall.");
        }        

        else if(!format.test(values.gre_date)) {
        
            errors.invalid = toast.error("Make sure the date is in DD/MM/YYYY format.");
        }

    }

    else if(type === 'sat') {

        if(values.sat_math_score == null || values.sat_english_score == null || values.sat_essay_score == null || values.sat_overall == null || values.sat_date == '') {

            errors.novalue = toast.error("Please fill all fields.");
        }

        else if(parseInt(values.sat_math_score) < 200 || parseInt(values.sat_math_score) > 800 || parseInt(values.sat_english_score) < 200 || parseInt(values.sat_english_score) > 800 || parseInt(values.sat_essay_score) < 0 || parseInt(values.sat_essay_score) > 24 || parseInt(values.sat_overall) < 400 || parseInt(values.sat_overall) > 1600) {
            
            errors.invalid = toast.error("Make sure the values are between 200-800, between 0-24 for essay and between 400-1600 for overall.");
        }        

        else if(!format.test(values.sat_date)) {
        
            errors.invalid = toast.error("Make sure the date is in DD/MM/YYYY format.");
        }

    }

    else if(type === 'gmat') {

        if(values.gmat_verbal_score == null || values.gmat_quant_score == null || values.gmat_writing_score == null || values.gmat_overall == null || values.gmat_date == '') {

            errors.novalue = toast.error("Please fill all fields.");
        }

        else if(parseInt(values.gmat_verbal_score) < 0 || parseInt(values.gmat_verbal_score) > 60 || parseInt(values.gmat_quant_score) < 0 || parseInt(values.gmat_quant_score) > 60 || parseFloat(values.gmat_writing_score) < 0 || parseFloat(values.gmat_writing_score) > 6 || parseInt(values.gmat_overall) < 200 || parseInt(values.gmat_overall) > 800) {
            
            errors.invalid = toast.error("Make sure the values are between 0-60, between 0-6 for writing and between 200-800 for overall.");
        }        

        else if(!format.test(values.gmat_date)) {
        
            errors.invalid = toast.error("Make sure the date is in DD/MM/YYYY format.");
        }

    }

    else if(type === 'toefl') {

        if(values.toefl_listening_score == null || values.toefl_reading_score == null || values.toefl_writing_score == null || values.toefl_speaking_score == null || values.toefl_overall == null || values.toefl_date == '') {

            errors.novalue = toast.error("Please fill all fields.");
        }

        else if(parseInt(values.toefl_listening_score) < 0 || parseInt(values.toefl_listening_score) > 30 || parseInt(values.toefl_reading_score) < 0 || parseInt(values.toefl_reading_score) > 30 || parseInt(values.toefl_writing_score) < 0 || parseInt(values.toefl_writing_score) > 30 || parseInt(values.toefl_speaking_score) < 0 || parseInt(values.toefl_speaking_score) > 30 || parseInt(values.toefl_overall) < 0 || parseInt(values.toefl_overall) > 120) {
            
            errors.invalid = toast.error("Make sure the values are between 0-30 and overall score between 0-120.");
        }        

        else if(!format.test(values.toefl_date)) {
        
            errors.invalid = toast.error("Make sure the date is in DD/MM/YYYY format.");
        }

    }

    return errors; 
}