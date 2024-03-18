import { useState } from "react";
import API_GMAIL from "../services/api";

const useApi=(urlObject)=>{
    const [response, setResponse] = useState(null)
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)
    
    const call=async(payload,type='')=>{
        setResponse(null)
        setLoader(true);
        setError("")


        try {
            let res=await API_GMAIL(urlObject,payload,type);
            setResponse(res.data);
            
        } catch (error) {
            setError(error.message)
            
        }finally{
            setLoader(false);
        }
        
    }
    return{call,response,error,loader};
}
export default useApi;