/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavItemRxplorer,CheckBoxFlight,Inputs,Button} from "@/components";
import { useEffect, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
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
        justify-content:space-between;
        flex-direction:row-reverse;
        padding:.4rem;
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
    const leftSideDiv = css`
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.13);
        border-radius: 25px 0 25px 0;
        box-shadow: 1px 1px 1px 1px #008cff90;
        text-align: center;
        `
    const formStyle = css`
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding:0 2rem;
        `;

    const mainTextH1 = css`
      font-size: 2.5rem;
      margin: 1rem;
      direction: rtl;
      color: white;
    `;
    const subTextH3 = css`
      font-size: 2rem;
      margin: 1rem;
      direction: rtl;
      color: white;
      `;

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
            setToken(res.token,res.user_id,res.email,res.type);
            dispatch(loginSuccess({ token: res.token, user: res.user_id, email:res.email, type:res.type }));
            notifyEngine(`خوش آمدید ${res.email}`, "success");
            router.push("/");
        } else {
          notifyEngine("ورود ناموفق", "error");
        }
      };

    return(
        <div css={mainLoginDiv}>
            <form css={formStyle} onSubmit={submitBehaviour}>
                <div css={userNameDiv}>
                    <Inputs inputDef={onChangeUserName} label={"نام کاربری"} type={"text"} name={"username"}/>
                    <BsFillInfoCircleFill style={{ color: "white", marginRight: "0.5rem", cursor: "pointer" }}
                        onClick={() => notifyEngine("برای ورود از شماره موبایل یا ایمیل خود استفاده کنید", "info")} />
                </div>
                <div css={passwordDiv}>
                    <Inputs inputDef={onChangePassword} label={"رمز عبور"} type={"password"} name={"password"}/>
                    <BsFillInfoCircleFill style={{ color: "white", marginRight: "0.5rem", cursor: "pointer" }}
                        onClick={() => notifyEngine("رمز عبور خود را وارد کنید", "info")} />
                </div>
                <div css={btnDiv}>
                    <Button type={"submit"} loading={auth.loading} >ورود</Button>
                </div>
                <CustomeCheckBox type={"checkbox"} checked={false}>مرا بخاطر بسپار</CustomeCheckBox>
                <BsFillInfoCircleFill style={{ color: "white", marginRight: "0.5rem", cursor: "pointer" }}
                    onClick={() => notifyEngine("با انتخاب این گزینه، در صورت بسته شدن مرورگر، اطلاعات شما ذخیره می‌شود", "info")} />
            </form>
            <div css={leftSideDiv}>
                <img src="logo_white-150x150.png" alt="Login Image" style={{ width: "100%", height: "auto", borderRadius: "25px 0 25px 0" }} />
                <h5 css={subTextH3}>هدیه به نسل آینده</h5>

            </div>
        </div>
    )
}

export default LoginMain