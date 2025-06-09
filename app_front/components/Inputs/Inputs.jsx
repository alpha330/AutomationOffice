/** @jsxImportSource @emotion/react */
import { H5 } from "../TypoGraphy";
import { IoAddCircle } from "react-icons/io5";
import { IoRemoveCircle } from "react-icons/io5";
import { css } from "@emotion/react";

const Input = ({ type, inputDef =()=>{},setValue, name, label, value, err ,disable=false }) => {
    
    
    const increaseNumber = () => {
        setValue((prev) => prev + 1); // مقدار را مستقیماً در state والد تغییر بده
    };

    const decreaseNumber = () => {
        setValue((prev) => Math.max(prev - 1, 0)); // مقدار نباید منفی شود
    };


    const inputEl = css`
        width: 80%;
        height: 50%;
        appearance: none;
        margin: 0;
        font-family: traffic;
        font-size: 1rem;
        background-color: transparent;
        color: white;
        border: none;
        border-radius: 6px;
        outline: none;
        text-align: center;
        
        &:focus {
            ~ label{
                transform:translate(0,-100%);
                width:100%;
                background-color:${err ? "rgba(255, 0, 0, 0.384)" :"rgba(196, 196, 196, 0.56)"};
                text-align:center;
                border-radius:10px;
            }
            ~ span{
                width:100%;
            }  
        }
    `;

    const textArea = css`
        width: 100%;
        height: 9rem;
        appearance: none;
        margin: 0;
        font-family: traffic;
        font-size: 1rem;
        background-color: transparent;
        color: white;
        border: none;
        border-radius: 6px;
        position: relative;
        outline: none;
        &:focus ~ label{
           transform:translate(0,-130%);
        }
        &:focus ~ span {
            width: 100%;
        }
        &::-webkit-calendar-picker-indicator {
            color: white;
            opacity: 0;
            cursor: pointer;
            background: url("./favicon.ico") no-repeat 95% center;
            background-size: 20px;
            padding-right: 30px;
        }
    `;

    const labelEl = css`
        
        ${value === "" ? "width: fit-content;":"width: 100%;"}
        height: fit-content;
        position: absolute;
        color: ${err ? "red" : "white"};
        font-size: 3rem;
        transition: all 600ms ease-in;
        text-align:center;
        margin-bottom:1rem;
        ${value === "" ? "background-color: transparent;":err ? "background-color: :rgba(255, 0, 0, 0.384);" :"background-color: :rgba(196, 196, 196, 0.56);"}
        ${value === "" ? "transform: translate(0,0)":"transform:translate(0,-130%);"}
        
    `;

    const divMainInputs = css`
        width: 100%;
        height: fit-content;
        position: relative;
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: row;
        direction: rtl;
    `;

    const divSpan = css`
        border: 1px solid ${err ? "red" : "white"};
        width: 0%;
        position: absolute;
        top: 115%;
        left: 0;
        transition: all 700ms ease-in;
        text-align: right;
    `

    const divBTN = css`
        width: 40px;
        height: 20px;
        border-radius: 20%;
        font-size: 2rem;
        background-color: #12012e4e;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
            background-color: #008cff;
        }
    `;

    if (type === "number") {
        return (
            <div className={name} css={divMainInputs}>
                {!disable && 
                <div onClick={increaseNumber} css={divBTN}>
                    <IoAddCircle />
                </div>
                }
                <input disabled value={value} style={{ textAlign: "center" }} css={inputEl} id={name} type={type} onChange={(e) => setValue(Number(e.target.value))} name={name}
                />
                <label css={labelEl} htmlFor={name}>
                    <H5>{label}</H5>
                </label>
                {!disable &&
                    <div onClick={decreaseNumber} css={divBTN}>
                        <IoRemoveCircle />
                    </div>
                }                
            </div>
        );
    } else if (type === "passenger") {
        return (
            <div className={name} css={divMainInputs}>
                <input
                    css={inputEl}
                    onClick={inputDef}
                    id={name}
                    type={"text"}
                    name={name}
                />
                <span css={divSpan}></span>
                <label css={labelEl} htmlFor={name}>
                    <H5>{label}</H5>
                </label>
            </div>
        );
    } else if (type === "textarea") {
        return (
            <div className={name} css={divMainInputs}>
                <textarea onChange={inputDef} css={textArea} id={name} name={name}></textarea>
                <span css={divSpan}></span>
                <label css={labelEl} htmlFor={name}>
                    <H5>{label}</H5>
                </label>
            </div>
        );
    } else {
        return (
            <div className={name} css={divMainInputs}>
                
                <input css={inputEl} id={name} type={type} onChange={inputDef} name={name} />                
                <label  css={labelEl} htmlFor={name}>
                    <H5>{label}</H5>
                </label>
                <span css={divSpan}></span>                
            </div>
        );
    }
};

export default Input;
