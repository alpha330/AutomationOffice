import React from "react";
import IndexSectionOne from "./IndexSectionOne";
import { ThemeProvider } from '@emotion/react';
import theme from "@/config/thems";

export default {
  title: "containers/IndexSectionOne",
  component: IndexSectionOne,
};

export const IndexSectionOneContainers = () => {
    return(
        <ThemeProvider theme={theme}>
            <IndexSectionOne/>
        </ThemeProvider>
    )    
} ;