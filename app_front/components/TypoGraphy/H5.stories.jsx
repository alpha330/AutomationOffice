import React from "react";
import H5 from "./H5";
import { ThemeProvider } from '@emotion/react';
import theme from "@/config/thems";

export default {
  title: "Components/Typography",
  component: H5,
};

export const h5Component = () => {
    return(
        <ThemeProvider theme={theme}>
            <H5>تست فونت</H5>
        </ThemeProvider>
    )    
} ;