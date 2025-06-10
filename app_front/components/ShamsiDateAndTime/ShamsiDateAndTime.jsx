/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import jalali from "jalali-dayjs";
import { BsClockFill } from "react-icons/bs";
import { BsCalendar2Event } from "react-icons/bs";

dayjs.extend(jalali);

export default function PersianClock() {
  const [now, setNow] = useState(dayjs());
  const clockStyle = css`
    width: 10%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    color: white;
    font-size: 1rem;
    text-align: center;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
    `;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const iranTime = new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now.toDate());

  const persianDate = now.format("YYYY/MM/DD"); 

  return (
    <div css={clockStyle}>
        <BsClockFill size={18}/>
        <div>  {iranTime}</div>
      <BsCalendar2Event size={18}/>
      <div>  {persianDate}</div>
    </div>
  );
}