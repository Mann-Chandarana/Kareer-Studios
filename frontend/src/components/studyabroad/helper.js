import client from "../../api";

export async function addAcademicScore(response, id){
    try {

        console.log(id);
        console.log(response);

        
        // response.ielts_date = parseFloat(response.scp_leadership);
  
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

        response.scp_leadership = parseFloat(response.scp_leadership);
        response.scp_management = parseFloat(response.scp_management);
  
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

        response.scp_leadership = parseFloat(response.scp_leadership);
        response.scp_management = parseFloat(response.scp_management);
  
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

        response.scp_leadership = parseFloat(response.scp_leadership);
        response.scp_management = parseFloat(response.scp_management);
  
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

        response.scp_leadership = parseFloat(response.scp_leadership);
        response.scp_management = parseFloat(response.scp_management);
  
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