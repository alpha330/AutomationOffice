import Layout from "@/containers/Layout/Layout";
import "../styles/animations.css";
import { ThemeProvider } from "@emotion/react";
import theme from "@/config/thems";
import store from "../config/store";
import { ToastContainer } from 'react-toastify';
import { Provider,useDispatch  } from "react-redux";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useEffect } from "react";
import { getToken, getUserId, getEmail, getType } from '@/utils/auth'; 
import { loginSuccess } from "@/store/authSlice";

const AuthManager = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken(); 

    if (token) {
      const user_id = getUserId();
      const email = getEmail();
      const type = Number(getType());

      const payload = { token, user_id, email, type };
      console.log("APP PAGE: ",payload)
      dispatch(loginSuccess(payload));
    } else {
        // اگر توکنی وجود نداشت، یک اکشن دیگر برای پایان دادن به حالت loading
        // میتوان تعریف کرد یا اینکه مطمئن شویم reducer در حالت های دیگر loading را false میکند
        // فعلا چون reducer ما در حالت fail هم لودینگ را false میکند، مشکلی نیست.
    }
  }, [dispatch]); // وابستگی dispatch برای جلوگیری از هشدار eslint

  return children;
}

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <AuthManager>
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            scriptProps={{
              async: true,
              defer: true,
              appendTo: "head",
            }}
          >
        <ThemeProvider theme={theme}>
          <Layout>
            <div className="toastyfy">
            <ToastContainer theme="dark"/>
            </div>
            <Component {...pageProps} />
          </Layout> 
        </ThemeProvider>
        </GoogleReCaptchaProvider>
      </AuthManager>      
    </Provider>           
  );
}

export default App