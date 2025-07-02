/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Inputs,Button} from "@/components";
import { useEffect, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { notifyEngine } from "@/utils/notifyEngine";
import { setToken } from "@/utils/auth";
import { setProfile } from "@/utils/profile";
import { useDispatch,useSelector } from "react-redux";
import { LOGIN_ACTION } from "@/actions/auth";
import { PROFILE_ACTION } from "@/actions/profile";
import { useRouter } from "next/router";
import { loginSuccess } from "@/store/authSlice";
import { profileSuccess } from "@/store/profileSlice";
import CustomeCheckBox from "@/components/CheckBox/CheckBox";
import Head from "next/head";

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
        width: 40%;
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
                "password": password
            };
        
            if (!userName || !password) return notifyEngine("پر کردن فرم الزامی است", "warning");
        
            // مرحله ۱: لاگین کاربر
            const loginRes = await dispatch(LOGIN_ACTION(data));
        
            if (loginRes && loginRes.token) {
                try {
                    // مرحله ۲: ذخیره توکن و آپدیت Redux برای لاگین
                    setToken(loginRes.token, loginRes.user_id, loginRes.email, loginRes.type,true);
                    dispatch(loginSuccess({ token: loginRes.token, user_id: loginRes.user_id, email: loginRes.email, type: loginRes.type }));
        
                    // مرحله ۳: دریافت پروفایل کاربر
                    const header = {
                        "Authorization": `token ${loginRes.token}`,
                        "Content-Type": "application/json",
                    };
                    const profileData = await dispatch(PROFILE_ACTION(header, "GET"));
        
                    if (profileData) { // چک میکنیم که اطلاعات پروفایل با موفقیت دریافت شده باشد
                        // مرحله ۴: ذخیره اطلاعات پروفایل در Redux با فرمت صحیح
                        // فرض بر این است که API کلیدها را به صورت snake_case برمیگرداند
                        const profilePayload = {
                            first_name: profileData.first_name,
                            last_name: profileData.last_name,
                            phone_number: profileData.phone_number,
                            image: profileData.image,
                            signitures: profileData.signitures,
                            date_of_birth: profileData.date_of_birth,
                            created_date: profileData.created_date,
                            updated_date: profileData.updated_date,
                        };
                        dispatch(profileSuccess(profilePayload));
        
                        // ذخیره در localStorage/sessionStorage (اختیاری)
                        setProfile(profilePayload); // بهتر است کل آبجکت را پاس دهید تا تابع setProfile آن را مدیریت کند
                    } else {
                        throw new Error("اطلاعات پروفایل دریافت نشد.");
                    }
                    
                    notifyEngine(`خوش آمدید ${loginRes.email}`, "success");
        
                    // مرحله ۵: ریدایرکت کاربر
                    switch (loginRes.type) {
                        case 3: router.push("/SuperAdminDashboard"); break;
                        case 2: router.push("/AdminDashboard"); break;
                        case 1: router.push("/UserDashboard"); break;
                        default: router.push("/"); break;
                    }
        
                } catch (error) {
                    console.error("Error after login:", error);
                    notifyEngine("خطایی پس از ورود رخ داد. لطفا دوباره تلاش کنید.", "error");
                    // اینجا میتوانید توکن را پاک کنید اگر فرآیند ناقص مانده
                }
            } else {
                notifyEngine(loginRes.message || "ورود ناموفق، نام کاربری یا رمز عبور اشتباه است", "error");
            }
        };

    return(
        <>
        <Head>
        <title>صفحه ورود | ارگ کریمان</title>
        <meta name="description" content="Generated by Ali Mahmoodi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_white-150x150.png" />
        </Head>
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
                <div css={btnDiv}>
                    <CustomeCheckBox type={"checkbox"} checked={false}>مرا بخاطر بسپار</CustomeCheckBox>
                    <BsFillInfoCircleFill style={{ color: "white", marginRight: "0.5rem", cursor: "pointer" }}
                        onClick={() => notifyEngine("با انتخاب این گزینه، در صورت بسته شدن مرورگر، اطلاعات شما ذخیره می‌شود", "info")} />
                </div>                
            </form>
            <div css={leftSideDiv}>
                <img src="logo_white-150x150.png" alt="Login Image" style={{ width: "100%", height: "auto", borderRadius: "25px 0 25px 0" }} />
                <h5 css={subTextH3}>هدیه به نسل آینده</h5>

            </div>
        </div>
        </>
        
    )
}

export default LoginMain