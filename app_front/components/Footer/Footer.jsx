/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect,useState } from "react";

const Footer = () => {
    const [isScrolling, setIsScrolling] = useState(false);
    let scrollTimeout;

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
        }, 200); // تغییر این مقدار برای تنظیم حساسیت توقف اسکرول
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      };
    }, []);

    const FooterMainDiv = css`
        width:100%;
        height:10vh;
        background-color: rgba(0, 0, 0, 0.57);
        font-size:1.5rem;
        display:${ isScrolling ? "none" : "flex" };
        justify-content:space-evenly;
        flex-direction:row;
        position:fixed;
        bottom:0;
        animation:HeadFootAnime 600ms ease-in;

    `;

    return (
        <div css={FooterMainDiv} className="footer">
        </div>
    )
}

export default Footer