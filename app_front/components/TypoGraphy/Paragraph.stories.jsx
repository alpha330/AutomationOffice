import React from "react";
import Paragraph from "./Paragraph";
import { ThemeProvider } from '@emotion/react';
import theme from "@/config/thems";

export default {
  title: "Components/Typography",
  component: Paragraph,
};

export const pComponent = () => {
    return(
        <ThemeProvider theme={theme}>
            <Paragraph>تست فونت</Paragraph>
        </ThemeProvider>
    )    
} ;