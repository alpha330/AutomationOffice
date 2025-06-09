import React from "react";
import Header from "./Header.jsx";
import { ThemeProvider } from '@emotion/react';
import theme from "@/config/thems";

export default {
  title: "components/Header",
  component: Header,
};

export const HeaderComponent = () => {
  return(
    <ThemeProvider theme={theme}>
        <Header/>
    </ThemeProvider>
    
  )
};