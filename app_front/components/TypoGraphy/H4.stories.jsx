import React from "react";
import H4 from "./H4";
import { ThemeProvider } from '@emotion/react';
import theme from "@/config/thems";

export default {
  title: "Components/Typography",
  component: H4,
};

export const h4Component = () => {
    return(
        <ThemeProvider theme={theme}>
            <H4>تست فونت</H4>
        </ThemeProvider>
    )    
} ;