import  axios from "axios"

const API_URL='http://localhost:8000';

// const API_URL="https://gmail-backend-nv6a.onrender.com/"
        //    Backend URL can also use

const API_GMAIL=async(urlObject, payload, type)=>{
    return await axios({
        method: urlObject.method,
        url:`${API_URL}/${urlObject.endpoint}/${type}`,
        data: payload
    })  
}

export default API_GMAIL;