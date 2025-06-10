/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavItemRxplorer,CheckBoxFlight,Inputs,Button} from "@/components";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { notifyEngine } from "@/utils/notifyEngine";
import { setToken ,getToken,setProfile} from "@/utils/auth";
import { useDispatch,useSelector } from "react-redux";
import { LOGIN_ACTION } from "@/actions/auth";
import { PROFILE_ACTION } from "@/actions/profile";
import { useRouter } from "next/router";
import { loginSuccess } from "@/store/authSlice";
import CustomeCheckBox from "@/components/CheckBox/CheckBox";

const LoginMain = () => {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const auth = useSelector((state)=>(state.auth))
    const router = useRouter()
    const mainLoginDiv = css`
    width:fit-content;
    height: fit-content;
    border-radius:25px 5px 25px 5px;
    background-color: rgba(0, 0, 0, 0.57);
    border:1px solid #008cff;
    box-shadow:1px 1px 1px 1px 1px #008cff90;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    padding:4rem;
    transition:all 900ms ease-in;
    `;

    const userNameDiv = css`
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:row;
        margin:2rem 0;
    `

    const passwordDiv = css`
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:row;
        margin:2rem 0;
    `

    const btnDiv = css`
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:row;
        margin:2rem 0;
        width:100%;
    `

    useEffect(()=>{
    },[])
    
    const onChangeUserName= (e) =>{
        setUserName(e.target.value)
    }

    const onChangePassword = (e) =>{
        setPassword(e.target.value)
    }

    const submitBehaviour = async (e) => {
        e.preventDefault();
        const data = { 
            "email_or_mobile": userName,
            "password":password

         };
      
        if (!userName || !password) return notify("پر کردن فرم الزامی است", "warning");
      
        const res = await dispatch(LOGIN_ACTION(data));
        console.log("RES",res)
        if (res.token) {
            const header = {
                "Authorization": `token ${res.token}`,
                "Content-Type": "application/json",
              };
            const resProfile = await dispatch(PROFILE_ACTION(header,"GET"))
            setProfile(resProfile)
            setToken(res.token,res.mobile);
            dispatch(loginSuccess({ token: res.token, user: res.user }));
            notifyEngine("خوش آمدید", "success");
            router.push("/");
        } else {
          notifyEngine("ورود ناموفق", "error");
        }
      };

    return(
        <div css={mainLoginDiv}>
            <form onSubmit={submitBehaviour}>
                <div css={userNameDiv}>
                    <Inputs inputDef={onChangeUserName} label={"نام کاربری"} type={"text"} name={"username"}/>
                </div>
                <div css={passwordDiv}>
                    <Inputs inputDef={onChangePassword} label={"رمز عبور"} type={"password"} name={"password"}/>
                </div>
                <div css={btnDiv}>
                    <Button type={"submit"} loading={auth.loading} >ورود</Button>
                </div>
                <CustomeCheckBox type={"checkbox"} checked={false}>مرا بخاطر بسپار</CustomeCheckBox>
            </form>
        </div>
    )
}

export default LoginMain