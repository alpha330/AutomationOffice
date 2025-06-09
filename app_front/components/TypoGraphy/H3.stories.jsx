import React from "react";
import H3 from "./H3";
import { ThemeProvider } from '@emotion/react';
import theme from "@/config/thems";

export default {
  title: "Components/Typography",
  component: H3,
};

export const h3Component = () => {
    return(
        <ThemeProvider theme={theme}>
            <H3>تست فونت</H3>
        </ThemeProvider>
    )    
} ;