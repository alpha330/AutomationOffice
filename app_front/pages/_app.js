import Layout from "@/containers/Layout/Layout";
import "../styles/animations.css";
import { ThemeProvider } from "@emotion/react";
import theme from "@/config/thems";
import store from "../config/store";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Loading } from "@/components";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <Provider store={store}>
      {loading && <Loading />} 
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