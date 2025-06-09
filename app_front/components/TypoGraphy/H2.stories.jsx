import React from "react";
import H2 from "./H2";
import { ThemeProvider } from '@emotion/react';
import theme from "@/config/thems";

export default {
  title: "Components/Typography",
  component: H2,
};

export const h2Component = () => {
    return(
        <ThemeProvider theme={theme}>
            <H2>تست فونت</H2>
        </ThemeProvider>
    )
    
} ;