import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../config/thems";
import Reset from "@/containers/Reset/Reset.jsx";
import "../styles/animations.css";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Reset/>
      <Story />
    </ThemeProvider>
  ),
];