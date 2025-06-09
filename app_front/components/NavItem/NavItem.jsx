/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { H5 } from "../TypoGraphy";

const NavItem = ({select,clickAction=()=>{},children,test=false})=>{
    const NavItemDiv = css`
        span{
            direction:rtl;
            width:0;
            border:1px solid white;
            transition:all 600ms ease-in;
        }
        width:fit-content;
        height:fit-content;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        transition:all 600ms ease-in;
        overflow: hidden;
        ${ select && "span{width:100%; border:2px solid #008cff;}; color:#008cff;"}
        flex-wrap:nowrap;
        cursor:pointer;
        &:hover  span{
            width:100%;
        }
        ${test && "background-color:black;"}
        

    `;

    return(
        <div onClick={clickAction} css={NavItemDiv}>
            <H5>{children}</H5>
            <span></span>
        </div>
    )
}

export default NavItem