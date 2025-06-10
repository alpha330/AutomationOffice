/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_ACTION } from "@/actions/auth";
import { getToken, getEmail, removeTokenAndMobile } from "@/utils/auth";
import { notifyEngine } from "@/utils/notifyEngine";
import { ShamsiDateAndTime } from "..";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const [isScrolling, setIsScrolling] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const token = getToken();
  const email = getEmail();

  useEffect(() => {
    setLoginStatus(Boolean(token && email));
  }, [token, email]);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleLogout = () => {
    const header = {
      "Authorization": `token ${token}`,
      "Content-Type": "application/json",
    };
    dispatch(LOGOUT_ACTION(header));
    removeTokenAndMobile();
    notifyEngine("خروج با موفقیت انجام شد", "success");
    setLoginStatus(false);
  };

  // Styles
  const styles = {
    header: css`
      width: 100%;
      height: 5vh;
      background-color: rgba(0, 0, 0, 0.57);
      font-size: 1.5rem;
      display: ${isScrolling ? "none" : "flex"};
      align-items: center;
      justify-content: ${auth.logged ? "space-between" : "space-around"};
      flex-direction:  "row";
      position: fixed;
      animation: HeadFootAnime 600ms ease-in;
      z-index: 10;
      transition: top 400ms ease-in;
    `,
    logo: css`
      height: 80%;
      margin-left: 3rem;
      border-radius: 10px;
    `
  };

  return (
    <div css={styles.header}>
      <img css={styles.logo} src="/logo_white-150x150.png" alt="ARG LOGO" />
      <ShamsiDateAndTime />
    </div>
  );
};

export default Header;
