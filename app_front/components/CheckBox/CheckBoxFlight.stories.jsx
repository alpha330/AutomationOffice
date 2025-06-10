import React from "react";
import CustomeCheckBox from "./CheckBox.jsx";

export default {
  title: "components/CheckBox",
  component: CustomeCheckBox,
};

export const CheckBoxUnselect = () => {
  return(
    <CustomeCheckBox  value={"oneWay"} checked={"test"} type={"radio"} >یک طرفه</CustomeCheckBox>  
  )
};

export const CheckBoxSelect = () => {
  return(
    <CustomeCheckBox  value={"oneWay"} checked={"oneWay"} type={"radio"} >یک طرفه</CustomeCheckBox>  
  )
};