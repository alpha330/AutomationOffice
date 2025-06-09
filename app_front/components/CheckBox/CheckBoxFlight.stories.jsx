import React from "react";
import CheckBoxFlight from "./CheckBox.jsx";

export default {
  title: "components/CheckBoxFlight",
  component: CheckBoxFlight,
};

export const CheckBoxFlightUnselect = () => {
  return(
    <CheckBoxFlight  value={"oneWay"} flightType={"test"} type={"radio"} >یک طرفه</CheckBoxFlight>  
  )
};

export const CheckBoxFlightSelect = () => {
  return(
    <CheckBoxFlight  value={"oneWay"} flightType={"oneWay"} type={"radio"} >یک طرفه</CheckBoxFlight>  
  )
};