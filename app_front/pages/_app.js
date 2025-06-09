import Layout from "@/containers/Layout/Layout";
import "../styles/animations.css";
import { ThemeProvider } from "@emotion/react";
import theme from "@/config/thems";
import store from "../config/store";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";


const App = ({ Component, pageProps }) => {

  return (
    <Provider store={store}>
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
    </Provider>           
  );
}

export default App