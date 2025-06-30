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
            <div className="toastyfy">
            <ToastContainer theme="dark"/>
            </div>
            <Component {...pageProps} />
          </Layout> 
        </ThemeProvider>
        </GoogleReCaptchaProvider>       
      </StateManager>      
    </Provider>           
  );
}

export default App