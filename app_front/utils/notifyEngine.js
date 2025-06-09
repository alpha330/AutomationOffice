import { toast } from 'react-toastify';
import { Paragraph } from "@/components";


const notifyEngine = (message,status) => 
    {
        if(status === "error"){
            return(
                toast.error(<Paragraph>{message}</Paragraph>)
            )
        }else if(status === "success"){
            return(
                toast.success(<Paragraph>{message}</Paragraph>)
            )
        }else if(status === "warning"){
            return(
                toast.warning(<Paragraph>{message}</Paragraph>)
            )
        }else if(status === "info"){
            return(
                toast.info(<Paragraph>{message}</Paragraph>)
            )
        }
    }

export {
    notifyEngine
}