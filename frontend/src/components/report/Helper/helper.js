import client from "../../../api";

export async function addReport(response){
    try {
        
        const data = await client(`/reports/addReport/${response.student_id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add report...!"})
    }
}


export async function updateReport(response){
    try {
        
        const data = await client(`/reports/updateReport/${response.student_id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update report...!"})
    }
}