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
import { getProfile } from "@/utils/profile";
import { loginSuccess } from "@/store/authSlice";
import { profileSuccess } from "@/store/profileSlice";
import { Loading } from "@/components";
import { useRouter } from "next/router";
import { useState } from "react";

const StateManager = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const authPayload = {
        token,
        user_id: getUserId(),
        email: getEmail(),
        type: Number(getType()),
      };
      dispatch(loginSuccess(authPayload));
      const userProfile = getProfile(); 
      if (userProfile) {
        dispatch(profileSuccess(userProfile));
      }
    }
  }, [dispatch]); 

  return children;
};

const AppLogicWrapper = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // این Effect وضعیت لاگین را از کوکی در اولین بارگذاری برنامه می‌خواند
  useEffect(() => {
    const token = getToken();
    const authPayload = {
        token,
        user_id: getUserId(),
        email: getEmail(),
        type: Number(getType()),
      };
    if (token) {
      dispatch(loginSuccess(authPayload));
    }
  }, [dispatch]);

  // این Effect برای نمایش لودینگ هنگام تغییر صفحه است
  useEffect(() => {
    const handleStart = (url) => {
      // فقط زمانی لودینگ را نشان بده که مسیر واقعاً در حال تغییر است
      if (url !== router.asPath) {
        setLoading(true);
      }
    };
    const handleComplete = () => setLoading(false);
    const handleError = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    // در زمان خروج از کامپوننت، event listener ها را پاک می‌کنیم
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  return (
    <>
      {loading && <Loading />}
      {children}
    </>
  );
};


const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <StateManager>
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
            <AppLogicWrapper>
              <div className="toastyfy">
              <ToastContainer theme="dark"/>
              </div>
              <Component {...pageProps} />
            </AppLogicWrapper>
          </Layout> 
        </ThemeProvider>
        </GoogleReCaptchaProvider>       
      </StateManager>      
    </Provider>           
  );
}

export default App