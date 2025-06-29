/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShamsiDateAndTime,UserSpecification } from "..";

const Header = () => {
  const auth = useSelector(state => state.auth);

  const [isScrolling, setIsScrolling] = useState(false);

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
      <UserSpecification/>
    </div>
  );
};

export default Header;
