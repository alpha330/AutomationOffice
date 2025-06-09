import React from "react";
import Small from "./Small";
import { ThemeProvider } from '@emotion/react';
import theme from "@/config/thems";

export default {
  title: "Components/Typography",
  component: Small,
};

export const smallComponent = () => {
    return(
        <ThemeProvider theme={theme}>
            <Small>تست فونت</Small>
        </ThemeProvider>
    )    
} ;