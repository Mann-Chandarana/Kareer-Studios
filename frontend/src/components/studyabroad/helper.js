import client from "../../api";

export async function addAcademicScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.ssc_score = parseFloat(response.ssc_score);
        response.ssc_backlog = parseInt(response.ssc_backlog);
  
        response.hsc_score = parseFloat(response.hsc_score);
        response.hsc_backlog = parseInt(response.hsc_backlog);

        response.diploma_score = parseFloat(response.diploma_score);
        response.diploma_backlog = parseInt(response.diploma_backlog);

        response.ug_score = parseFloat(response.ug_score);
        response.ug_backlog = parseInt(response.ug_backlog);
  
        const data = await client.post(`/records/addAcademicScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add report...!"})
    }
}

export async function addIeltsScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.ielts_listening_score = parseFloat(response.ielts_listening_score);
        response.ielts_reading_score = parseFloat(response.ielts_reading_score);
        response.ielts_writing_score = parseFloat(response.ielts_writing_score);
        response.ielts_speaking_score = parseFloat(response.ielts_speaking_score);
  
        const data = await client.post(`/records/addIeltsScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add report...!"})
    }
}

export async function addPteScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.pte_listening_score = parseInt(response.pte_listening_score);
        response.pte_reading_score = parseInt(response.pte_reading_score);
        response.pte_writing_score = parseInt(response.pte_writing_score);
        response.pte_speaking_score = parseInt(response.pte_speaking_score);
  
        const data = await client.post(`/records/addPteScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add report...!"})
    }
}

export async function addGreScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.gre_verbal_score = parseInt(response.gre_verbal_score);
        response.gre_quant_score = parseInt(response.gre_quant_score);
        response.gre_writing_score = parseFloat(response.gre_writing_score);
  
        const data = await client.post(`/records/addGreScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add report...!"})
    }
}

export async function addSatScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.sat_math_score = parseInt(response.sat_math_score);
        response.sat_english_score = parseInt(response.sat_english_score);
        response.sat_essay_score = parseInt(response.sat_essay_score);
  
  
        const data = await client.post(`/records/addSatScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add report...!"})
    }
}

export async function addGmatScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.gmat_verbal_score = parseInt(response.gmat_verbal_score);
        response.gmat_quant_score = parseInt(response.gmat_quant_score);
        response.gmat_writing_score = parseInt(response.gmat_writing_score);
  
  
        const data = await client.post(`/records/addGmatScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add report...!"})
    }
}


export async function updateReport(response, id){
    try {

        response.scp_leadership = parseFloat(response.scp_leadership);
        response.scp_management = parseFloat(response.scp_management);
        response.scp_bodybalance = parseFloat(response.scp_bodybalance);
        response.scp_logic = parseFloat(response.scp_logic);
        response.scp_bodymovement = parseFloat(response.scp_bodymovement);
        response.scp_senses = parseFloat(response.scp_senses);
        response.scp_rhythm = parseFloat(response.scp_rhythm);
        response.scp_visual = parseFloat(response.scp_visual);
        response.scp_observation = parseFloat(response.scp_observation);
        response.scp_communication = parseFloat(response.scp_communication);
        response.as_follower = parseFloat(response.as_follower);
        response.as_experimental = parseFloat(response.as_experimental);
        response.as_different = parseFloat(response.as_different);
        response.as_thoughtful = parseFloat(response.as_thoughtful);
        response.lc_auditory = parseFloat(response.lc_auditory);
        response.lc_visual = parseFloat(response.lc_visual);
        response.lc_physical = parseFloat(response.lc_physical);
        response.wa_intelligent = parseFloat(response.wa_intelligent);
        response.wa_emotional = parseFloat(response.wa_emotional);
        response.wa_visionary = parseFloat(response.wa_visionary);
        response.wa_creative = parseFloat(response.wa_creative);
        response.wa_adverse = parseFloat(response.wa_adverse);
        
        const data = await client.put(`/reports/updateReport/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update report...!"})
    }
}