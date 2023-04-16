import client from "../../../api";

export async function addReport(response, id){
    try {

        console.log(id);
        
        const data = await client.post(`/reports/addReport/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't add report...!"})
    }
}


export async function updateReport(response, id){
    try {
        
        const data = await client.put(`/reports/updateReport/${id}`, response);

        return Promise.resolve({ data })

    } catch (error) {
        return Promise.reject({ error : "Couldn't update report...!"})
    }
}