/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { H5 } from "../TypoGraphy"
import RingLoader  from "react-spinners/RingLoader";

const Button =({children,type,onCliCkAction=()=>{},loading=false,disabled = false,fontSize=""})=>{

    const btnStyle = css`
        width:fit-content;
        height:fit-content;
        appearance:none;
        background-color: rgba(0, 0, 0, 0.57);
        border-radius:15px 5px 15px 5px;    
        cursor:pointer;
        color:white;
        border:1px solid #008cff;
        transition:all 700ms ease-in;
        padding:.5rem 0;
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 1rem 2rem;
        &:disabled{
            cursor:normal;
            background-color: rgba(34, 36, 53, 0.84);
            color:grey;
            border:1px solid rgb(80, 80, 80);
        }
        &:hover{
            background-color:#008cff6e;
        }
    `

    return(
        <>
            { loading ? <button onClick={onCliCkAction} css={btnStyle} type={type}><H5><RingLoader  size={25} color="white"/></H5></button> : <button onClick={onCliCkAction} disabled={disabled} css={btnStyle} type={type}><H5>{children}</H5></button>}
        </>                
    )
}

export default Button