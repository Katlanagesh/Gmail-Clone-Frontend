import { useEffect, useState} from "react";
import { useOutletContext, useParams} from "react-router-dom"
import { API_URLS } from "../services/api.Url";
import useApi from '../hooks/useApi'
import { Box, List, Checkbox } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
 import Email from "./Email";
import NoMail from "./common/NoMail";
import { EMPTY_TABS } from "../constant/constant";

const Emails = () => {
    const [selectedEmails ,setSelectedEmails]=useState([]);
    const [refreshScreen, setRefreshScreen] = useState(false)
   const {openDrawer}=useOutletContext();

    const {type} = useParams();
    const getEmailService=useApi(API_URLS.getEmail);
    const moveEmailToBin=useApi(API_URLS.moveToBin);
    const deleteEmailService=useApi(API_URLS.deleteEmail)


    useEffect(() => {
      
      getEmailService.call({},type);
  }, [type , refreshScreen])


  const selectAllEmails=(e)=>{
    if(e.target.checked){
        const emails=getEmailService?.response?.map(email=>email._id);
        setSelectedEmails(emails);
    }else{
        setSelectedEmails([])
    }
}

const deleteEmails=(e)=>{
    if(type==='bin'){
        deleteEmailService.call(selectedEmails)
    }else{
        moveEmailToBin.call(selectedEmails)

    }
    setRefreshScreen(preState =>!preState)
}



   return(
    <Box style={openDrawer ? { marginLeft: 250, width: 'calc(100%-250px)' } : { width: '100%' } }>
           <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
            <Checkbox size="small" onChange={(e)=>selectAllEmails(e)}/>
            <DeleteOutline
                onClick={(e)=>deleteEmails(e)}
            />
           </Box>
           <List>
            {
                getEmailService?.response?.map(email=>(
                    <Email
                         email={email} 
                        key={email._id}
                        selectedEmails={selectedEmails}
                        setRefreshScreen={setRefreshScreen}
                        setSelectedEmails={setSelectedEmails}
                       
                    />
                ))
            }
           </List>
           {
            getEmailService?.response?.length === 0 &&
                    <NoMail message={EMPTY_TABS[type]} />
            }

        </Box>
)
    }
    export default Emails