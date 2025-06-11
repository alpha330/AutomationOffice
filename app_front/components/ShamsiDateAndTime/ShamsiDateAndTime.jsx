/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import persianDate from "persian-date";

export default function PersianClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const clockStyle = css`
    color:white;
    width:10%;
    height:fit-content;
    display:flex;
    align-items:center;
    justify-content:space-between;
    flex-direction:row;
    font-size:1rem;
  `

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new persianDate().toLocale("fa").format("HH:mm:ss");
      const today = new persianDate().format("YYYY/MM/DD");
      setTime(now);
      setDate(today);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time || !date) return null;

  return (
    <div css={clockStyle}>
      <div>  {time}</div>
      <div>  {date}</div>
    </div>
  );
}
