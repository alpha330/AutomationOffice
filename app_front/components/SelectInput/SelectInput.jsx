/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


const SelectInput =({nameFor,label,packData,filterDep=()=>{}})=>{
    const labelSelect = css`
        widht:100%;
        height:fit-content;
        margin:1rem 0;
        font-size:1rem;
    `

    const selectInput = css`
        width:5rem;
        text-align:center;
        font-size:1rem;
        background-color:transparent;
        color:white;
        border:none;
        appearance: none;
        outline: none;
        border-bottom:1px solid white;
        cursor: pointer;
       
    `

    const optionInput = css`
        background-color:rgb(0, 0, 0);
        appearance: none;
        outline: none;
        cursor: pointer;
    `

    return(
        <>
            <label css={labelSelect} htmlFor={nameFor}>{label}:</label>

            <select css={selectInput} onChange={filterDep} name={nameFor} id={nameFor}>
                <option css={optionInput} value="all">همه</option>
                {
                    packData.map((data=>{
                        if(nameFor === "departure"){
                            return <option  css={optionInput} key={`${data.id}`} value={data.departure}>{data.departure}</option> 
                        }
                        if(nameFor === "destination"){
                            return <option  css={optionInput} key={`${data.id}`} value={data.destination}>{data.destination}</option> 
                        }
                    }))
                }
            </select>
        </>
        
    )

}

export default SelectInput