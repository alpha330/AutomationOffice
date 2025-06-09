import React from "react";
import H1 from "./H1";
import { ThemeProvider } from '@emotion/react';
import theme from "@/config/thems";

export default {
  title: "Components/Typography",
  component: H1,
};

export const h1Component = () => {
    return(
        <ThemeProvider theme={theme}>
            <H1>تست فونت</H1>
        </ThemeProvider>
    )
    
} ;