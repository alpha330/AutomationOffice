/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect,useState } from "react";
import { Paragraph } from "../TypoGraphy";

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
        height:4vh;
        background-color: rgba(0, 0, 0, 0.57);
        font-size:1rem;
        display:${ isScrolling ? "none" : "flex" };
        justify-content:space-evenly;
        flex-direction:row;
        position:fixed;
        bottom:0;
        animation:HeadFootAnime 600ms ease-in;

    `;

    const FooterItemDiv = css`
      width:fit-content;
      height:100%;
      font-size:1rem;
      color:rgb(133, 133, 133);
      display:flex;
      justify-content:space-evenly;
      flex-direction:column;
      direction:rtl;
    `

    return (
        <div css={FooterMainDiv} className="footer">
          <div css={FooterItemDiv}>
            <Paragraph>©کلیه حقوق این سایت مربوط به شرکت قطعات تولیدی نخل ارگ کریمان میباشد</Paragraph>
          </div>
          <div css={FooterItemDiv}>
            <Paragraph>طراحی و توسعه سایت توسط XigmaCoders</Paragraph>
          </div>
        </div>
    )
}

export default Footer