/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paragraph } from "../TypoGraphy"

const CustomeCheckBox = ({type,changeDef=()=>{},checked,children,value}) => {
    const inputCheckBox = css`
        width: 15px;
        height: 15px;
        border-radius:30%;
        margin:0 .5rem;
        appearance:none;
        background-color:white;
        cursor:pointer;
        border:1px solid #008cff;
        transition:all 600ms ease-in;
        &:checked{
            background-color:#008cff;
            border:1px solid white;
        }
        &:checked ~ span{
            background-color:#008cff;
            border:1px solid white;
        }
    `

    const labelDivMain = css`
        text-align:center;
    `

    const divMain = css`
        display:flex;
        align-items:center;
        justify-content:center;
        position:relative;
        width: fit-content;
        height:fit-content;
        padding:1rem;
    `
    return(
        <div  css={divMain}>            
            <input 
                css={inputCheckBox}                       
                onChange={changeDef}
                value={value}
                type={type}
                checked={checked}
            />
            <label  css={labelDivMain}  style={{ color : checked === value ?  "#008cff" :"white" }}><Paragraph>{children}</Paragraph></label>
        </div>        
    )
}

export default CustomeCheckBox