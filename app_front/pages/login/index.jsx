/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Head from "next/head";
import { H1,Paragraph,Inputs,Button } from "@/components";
import { useState,useEffect } from "react";
import Link from "next/link";
import { useDispatch,useSelector } from "react-redux";
import { LOGIN_ACTION } from "@/actions/auth";
import { PROFILE_ACTION } from "@/actions/profile";
import { useRouter } from "next/router";
import { setToken ,getToken} from "@/utils/auth";
import { setProfile } from "@/utils/profile";
import { loginSuccess } from "@/store/authSlice";
import { profileSuccess } from "@/store/profileSlice";
import { notifyEngine } from "@/utils/notifyEngine";


const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const onChangeEmail= (e) =>{
        setEmail(e.target.value)
    }
    const router = useRouter()
    const onChangePassword = (e) =>{
        setPassword(e.target.value)
    }
    const auth = useSelector((state)=>(state.auth))
    const mainDivContact = css`
        width:100%;
        height:100vh;
        background-color:rgb(8, 0, 83);
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        color:white;
        position:relative;
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
        height:40%;
        border-radius:10px;
        display:flex;
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
    const btnPosition = css`margin-bottom:2rem; width: 100%; display:flex; align-items:center; justify-content:center;`
    
    useEffect(()=>{
        const loginStatus = getToken()
        if (loginStatus){
            router.push("/")
        }
    },[])
        
    const submitBehaviour = async (e) => {
        e.preventDefault();
        const data = {
            "email_or_mobile": email,
            "password": password
        };
    
        if (!email || !password) return notifyEngine("پر کردن فرم الزامی است", "warning");
    
        const res = await dispatch(LOGIN_ACTION(data));
    
        if (res && res.token) { // <-- چک میکنیم که پاسخ معتبر و توکن دار باشد
            // دریافت پروفایل کاربر
            const header = {
                "Authorization": `token ${res.token}`,
                "Content-Type": "application/json",
                "id": res.id,
            };
            const resProfile = await dispatch(PROFILE_ACTION(header,"GET"));
            setProfile(
                resProfile.first_name,
                resProfile.last_name,image,
                resProfile.signitures,
                resProfile.date_of_birth,
                resProfile.created_date,
                resProfile.updated_date,
                resProfile.phone_number
            );
    
            // ذخیره اطلاعات در کوکی و Redux State
            setToken(res.token, res.user_id, res.email, res.type);
            dispatch(loginSuccess({ token: res.token, user_id: res.user_id, email: res.email, type: res.type }));
            const payload = {
                firstName:resProfile.firstName,
                lastName:resProfile.lastName,
                phoneNumber:resProfile.phoneNumber,
                image:resProfile.image, 
                birthDate:resProfile.birthDate, 
                createDate:resProfile.createDate, 
                updatedDate:resProfile.updatedDate
            };
            dispatch(profileSuccess(payload))
            notifyEngine(`خوش آمدید ${res.email}`, "success");
    
            // --- بخش اصلی تغییر ---
            // ریدایرکت مستقیم به داشبورد مربوطه
            switch (res.type) {
                case 3 : // Superuser
                    router.push("/SuperAdminDashboard");
                    break;
                case 2 : // Admin
                    router.push("/AdminDashboard"); // این صفحه را باید بسازید
                    break;
                case 1 : // Client
                    router.push("/UserDashboard"); // این صفحه را باید بسازید
                    break;
                default:
                    router.push("/"); // به عنوان fallback
                    break;
            }
    
        } else {
            notifyEngine(res.message || "ورود ناموفق، نام کاربری یا رمز عبور اشتباه است", "error");
        }
    };

    return(
        <>
        <Head>
          <title>سرزمین من | ورود</title>
          <meta name="description" content="Generated by Ali Mahmoodi" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/icon.ico" />
        </Head>
        <div css={mainDivContact}>
            <div css={headerDivContact}>
                <H1>ورود</H1>
            </div>
            <form onSubmit={submitBehaviour} css={sectionInfoSubmit}>
                <div css={css`margin-bottom:2rem;width: 100%;`}>
                    <Inputs inputDef={onChangeEmail} name={"email"} label={"نام کاربری"} type={"text"} value={email}/>
                </div>
                <div css={css`margin-bottom:2rem; width: 100%;`}>
                <Inputs inputDef={onChangePassword} name={"password"} label={" رمز عبور "} type={"password"} value={password}/>           
                </div>
                
                <div css={btnPosition}>
                    <Button loading={auth.loading} type={"submit"}>ورود</Button>          
                </div>   
                <div css={forgetRegisterDev}>
                    <Link href={"/forget"}>
                        <Paragraph>فراموشی رمز عبور</Paragraph>
                    </Link>
                    <Link href={"/register"}>
                        <Paragraph>حساب ندارم؟</Paragraph>
                    </Link>                    
                </div>                                        
            </form>
        </div>

        </>
        
    )
}

export default Login