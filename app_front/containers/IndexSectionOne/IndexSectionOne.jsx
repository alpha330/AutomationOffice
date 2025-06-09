/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mainDivIndxSecOne } from "./IndexSectionOneStyle";
import LoginMain from "../Login/Login";
import { useSelector } from "react-redux";

const IndexSectionOne = () =>{
    const auth = useSelector(state=>state.auth)

    const upperMainText = css`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        color: white;
        height: 40%;
    ` 
    const mainTextH1 = css`
        font-size: 4rem !important;
        margin: 1rem;
        animation:widthScalation 3s ease;
        direction: rtl;
        overflow: hidden;
        color:white;
    `
    const subTextH3 = css`
        font-size: 2rem;
        margin: 1rem;
        animation:widthScalation 5s ease;
        direction: rtl;
        overflow: hidden;
        color:white;
    `
    return(
        <div css={mainDivIndxSecOne}>
            <div css={mainTextH1}>
                شرکت نخل ارگ کریمان
            </div>
            <LoginMain/>
            <div css={subTextH3}>
                    اتوماسیون اداری
            </div>  
        </div>
    )
}

export default IndexSectionOne