/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Head from "next/head";
import { H1,Paragraph,Inputs,Button } from "@/components";
import { useState,useRef } from "react";
import Link from "next/link";
import { validateIranPhoneNumber } from "@/utils/validators";
import { notifyEngine } from "@/utils/notifyEngine";
import { REGISTER_ACTION,
    VERIFICATION_CODE,
    RESET_PASSWORD_CODE,
    RETRY_VERIFICATION_CODE
 } from "@/actions/auth";
import { useDispatch,useSelector } from "react-redux";
import { useRouter } from "next/router";
import { formatTime } from "@/utils/tools";

const Register = () => {
    const [mobileError,setMobileErros] = useState(false)
    const [mobileNumber,setMobileNumber] = useState("")
    const [password1,setPassword1] = useState("")
    const [password2,setPassword2] = useState("")
    const [authCode,setAuthCode] = useState("")
    const [codeWindows,setCodeWindows] = useState(false)
    let [seccounds,setSeccounds] =useState(0)
    const router = useRouter()
    const dispatch = useDispatch()
    const register = useSelector(state=>state.auth)
    const intervalRef = useRef(null);

    const onChangePassword1 = (e) =>{
        setPassword1(e.target.value)
    }

    const onChangePassword2 = (e) =>{
        setPassword2(e.target.value)
    }

    const onChangeAuthCode = (e) =>{
        setAuthCode(e.target.value)
    }

    const onChangeMobileNumber = (e) =>{
        let mobileNmber = e.target.value
        if(validateIranPhoneNumber(mobileNmber)){
            setMobileNumber(mobileNmber)
            setMobileErros(false)
        }else{
            setMobileErros(true)
        }
        
    }

    

    const startCountdown = () => {
      if (intervalRef.current) return; 

      intervalRef.current = setInterval(() => {
        setSeccounds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };


    const mainDivContact = css`
        width:100%;
        height:100vh;
        background-color:rgb(8, 0, 83);
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        color:white;
        postition:relative;
        overflow:hidden;
    `
    const headerDivContact = css`
        width:100%;
        height:fit-content;
        display:flex;
        align-items:center;
        justify-content:center;
        background-image:linear-gradient(to bottom right, rgba(0, 6, 61, 0.48) , rgba(0, 6, 61, 0.48)) ,url(./images/Blog/blog.jpg);
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        padding:4rem 0;
        position:absolute;
        top:5%;
        animation: topToDown 1s ease-in;
        `

    const sectionInfoSubmit = css`
        width:20%;
        height:fit-content;
        border-radius:10px;
        display:flex;
        position:absolute;
        top:25%;
        align-items:center;
        justify-content:space-between;
        flex-direction:column;
        direction:rtl;
        padding:1rem 0;
        ::-webkit-scrollbar {
          display: none;
        }
          animation:dropDownAnim 2s ease-in;
    `
    const forgetRegisterDev = css`
        width:100%;
        height:fit-content;
        padding:1rem 0;
        display:flex;
        align-items:center;
        justify-content:space-between;
        flex-direction:row;
         p{
            padding: .5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transition: all 600ms ease-in-out;
            &:hover{
                background-color: #008cff6e;
            }
        }
        
        a{
            color:white;
            text-decoration:none;
            cursor:pointer;

        }
    `
    const submitToken = async(e) =>{
        if (e){
            e.preventDefault()
        }
        const data = {
            "temp_code":authCode,
        }
        const res = await dispatch(VERIFICATION_CODE(data)); 
        
        if(res.STATUS === "NOK"){
            setSeccounds(120)
            startCountdown()
            notifyEngine(res.message,"error")
            
        }
        if (res.STATUS === "OK"){
            router.push("/login")
            notifyEngine(res.message,"success")
        }              
    }

    const retrySendingCode = async() =>{
        setSeccounds(120)
        startCountdown()
        const data = {
            "mobile_number":mobileNumber,
        }
        const res = await dispatch(RETRY_VERIFICATION_CODE(data))
        if(res.STATUS === "OK"){
            notifyEngine(res.message,"success")
        }
        if(res.STATUS === "NOK"){
            notifyEngine(res.message,"error")
        }
    }


    const submitBehaviour = async(e) =>{
        if (e){
            e.preventDefault()
        }
        const data = {
            "mobile_number":mobileNumber,
            "password":password1,
            "password_1":password2

        }
        if( mobileNumber === "" || password1 === "" || password2 === "" ){
            notifyEngine("لطفا فرم را پر کنید","warning")
        }else{
                      
            const res = await dispatch(REGISTER_ACTION(data));
            if(res.mobile_number === mobileNumber){
                setCodeWindows(true)
                notifyEngine("ثبت نام انجام شد و کد تایید ارسال شد","success")
                setSeccounds(120)
                startCountdown()
            }else{
                if (typeof res === "object"){
                    const allErrors = Object.values(res).flat(); // جمع‌آوری همه پیام‌ها
                    notifyEngine(allErrors.join("، "), "error");
            } 
                
            }
        }
        
    }


    const windowsAuthCode = css`
        position:fixed;        
        ${codeWindows ? "display:flex;" : "display:none;"}
        align-items:center;
        justify-content:center;
        flex-direction:column;
        background:black;
        border-radius:10px;
        max-width:40rem;
        min-width:20rem;
        max-height:40rem;
        min-height:20rem;
        z-index:10;
        form {
            width:80%;
            height:100%;
            padding:10px;
        }
    `
    const btnPosition = css`margin-bottom:2rem; height:100%; width: 100%; display:flex; align-items:center; justify-content:space-between; flex-direction:column;`



    return(
        <>
        <Head>
          <title>سرزمین من | ثبت نام</title>
          <meta name="description" content="Generated by Ali Mahmoodi" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/icon.ico" />
        </Head>
        <div css={mainDivContact}>
            <div css={headerDivContact}>
                <H1>ثبت نام</H1>
            </div>
            <div css={windowsAuthCode}>
                <form onSubmit={submitToken} >
                    <div css={css`margin-bottom:2rem; width: 100%;`}>
                        <Inputs inputDef={onChangeAuthCode} name={"authcode"} label={"کد صحت سنجی موبایل"} type={"text"} value={authCode}/>           
                    </div>
                    <div css={btnPosition}>  
                        { seccounds === 0 ?
                            <Button disabled={true} loading={register.loading} type={"submit"} >تایید</Button> 
                            :
                            <Button disabled={false} loading={register.loading} type={"submit"} >تایید</Button> 
                        }                  
                               
                    </div>                    
                </form>
                <div css={btnPosition}>
                    {seccounds === 0 ?
                        <Button onCliCkAction={retrySendingCode} disabled={false} loading={register.loading} type={"button"} >ارسال مجدد</Button>  
                        :
                        <Button disabled={true} loading={register.loading} type={"button"} >{formatTime(seccounds)}</Button>  
                    }     
                </div>   
            </div>
            <form autoComplete="off" onSubmit={submitBehaviour} css={sectionInfoSubmit}>
                <div css={css`margin-bottom:2rem;width: 100%;`}>
                    <Inputs inputDef={onChangeMobileNumber} name={"mobileNumber"} label={"شماره موبایل"} type={"text"} value={mobileNumber} err={mobileError}/>
                </div>
                <div css={css`margin-bottom:2rem; width: 100%;`}>
                    <Inputs inputDef={onChangePassword1} name={"password1"} label={" رمز عبور "} type={"password"} value={password1}/>           
                </div>
                <div css={css`margin-bottom:2rem; width: 100%;`}>
                    <Inputs inputDef={onChangePassword2} name={"password2"} label={"  تکرار رمز عبور "} type={"password"} value={password2}/>           
                </div>
                <div css={btnPosition}>
                    <Button loading={register.loading} type={"submit"} >ثبت نام</Button>          
                </div>
                <div css={forgetRegisterDev}>
                    <Link href={"/forget"}>
                        <Paragraph>فراموشی رمز عبور</Paragraph>
                    </Link>
                    <Link href={"/login"}>
                        <Paragraph> ورود</Paragraph>
                    </Link>                    
                </div>                                        
            </form>
        </div>

        </>
        
    )
}

export default Register