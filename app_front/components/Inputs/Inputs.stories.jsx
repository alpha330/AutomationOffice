import React from "react";
import Input from "./Inputs";

export default {
  title: "components/Input",
  component: Input,
};

export const InputSimple = () => {
  return(
    <Input  type={"text"} name={"ورودی تکست"} label={"ورودی تکست"} />
  )
};

export const InputNumber = () => {
  return(
    <Input  type={"number"} name={"وروذی عددی"} label={"وروذی عددی"} />
  )
};

export const InputDate = () => {
  return(
    <Input  type={"date"} name={"وروذی تاریخ"} label={"وروذی تاریخ"} />
  )
};