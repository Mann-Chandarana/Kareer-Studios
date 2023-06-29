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
        return Promise.reject({ error : "Couldn't add score...!"})
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
        response.ielts_overall = parseFloat(response.ielts_overall);
  
        const data = await client.post(`/records/addIeltsScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add score...!"})
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
        response.pte_overall = parseFloat(response.pte_overall);
  
        const data = await client.post(`/records/addPteScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add score...!"})
    }
}

export async function addGreScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.gre_verbal_score = parseInt(response.gre_verbal_score);
        response.gre_quant_score = parseInt(response.gre_quant_score);
        response.gre_writing_score = parseFloat(response.gre_writing_score);
        response.gre_overall = parseFloat(response.gre_overall);
  
        const data = await client.post(`/records/addGreScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add score...!"})
    }
}

export async function addSatScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.sat_math_score = parseInt(response.sat_math_score);
        response.sat_english_score = parseInt(response.sat_english_score);
        response.sat_essay_score = parseInt(response.sat_essay_score);
        response.sat_overall = parseFloat(response.sat_overall);
  
        const data = await client.post(`/records/addSatScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add score...!"})
    }
}

export async function addGmatScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.gmat_verbal_score = parseInt(response.gmat_verbal_score);
        response.gmat_quant_score = parseInt(response.gmat_quant_score);
        response.gmat_writing_score = parseInt(response.gmat_writing_score);
        response.gmat_overall = parseFloat(response.gmat_overall);
  
        const data = await client.post(`/records/addGmatScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add score...!"})
    }
}

export async function addToeflScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.toefl_listening_score = parseFloat(response.toefl_listening_score);
        response.toefl_reading_score = parseFloat(response.toefl_reading_score);
        response.toefl_writing_score = parseFloat(response.toefl_writing_score);
        response.toefl_speaking_score = parseFloat(response.toefl_speaking_score);
        response.toefl_overall = parseFloat(response.toefl_overall);
  
        const data = await client.post(`/records/addToeflScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add score...!"})
    }
}


export async function updateAcademicScore(response, id){
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
  
        const data = await client.put(`/records/updateAcademicScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update score...!"})
    }
}

export async function updateIeltsScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.ielts_listening_score = parseFloat(response.ielts_listening_score);
        response.ielts_reading_score = parseFloat(response.ielts_reading_score);
        response.ielts_writing_score = parseFloat(response.ielts_writing_score);
        response.ielts_speaking_score = parseFloat(response.ielts_speaking_score);
        response.ielts_overall = parseFloat(response.ielts_overall);
  
        const data = await client.put(`/records/updateIeltsScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update score...!"})
    }
}

export async function updatePteScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.pte_listening_score = parseInt(response.pte_listening_score);
        response.pte_reading_score = parseInt(response.pte_reading_score);
        response.pte_writing_score = parseInt(response.pte_writing_score);
        response.pte_speaking_score = parseInt(response.pte_speaking_score);
        response.pte_overall = parseFloat(response.pte_overall);
  
        const data = await client.put(`/records/updatePteScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update score...!"})
    }
}

export async function updateGreScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.gre_verbal_score = parseInt(response.gre_verbal_score);
        response.gre_quant_score = parseInt(response.gre_quant_score);
        response.gre_writing_score = parseFloat(response.gre_writing_score);
        response.gre_overall = parseFloat(response.gre_overall);
  
        const data = await client.put(`/records/updateGreScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update score...!"})
    }
}

export async function updateSatScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.sat_math_score = parseInt(response.sat_math_score);
        response.sat_english_score = parseInt(response.sat_english_score);
        response.sat_essay_score = parseInt(response.sat_essay_score);
        response.sat_overall = parseFloat(response.sat_overall);
  
        const data = await client.put(`/records/updateSatScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update score...!"})
    }
}

export async function updateGmatScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.gmat_verbal_score = parseInt(response.gmat_verbal_score);
        response.gmat_quant_score = parseInt(response.gmat_quant_score);
        response.gmat_writing_score = parseInt(response.gmat_writing_score);
        response.gmat_overall = parseFloat(response.gmat_overall);
  
        const data = await client.put(`/records/updateGmatScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update score...!"})
    }
}

export async function updateToeflScore(response, id){
    try {

        console.log(id);
        console.log(response);

        response.toefl_listening_score = parseFloat(response.toefl_listening_score);
        response.toefl_reading_score = parseFloat(response.toefl_reading_score);
        response.toefl_writing_score = parseFloat(response.toefl_writing_score);
        response.toefl_speaking_score = parseFloat(response.toefl_speaking_score);
        response.toefl_overall = parseFloat(response.toefl_overall);
  
        const data = await client.put(`/records/updateToeflScore/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update score...!"})
    }
}