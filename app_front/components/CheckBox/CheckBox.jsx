/** @jsxImportSource @emotion/react */
import {inputCheckBoxFlight,divMain,labelDivMain} from "./CheckBoxStyle"
import { Paragraph } from "../TypoGraphy"

const CheckBoxFlight = ({type,changeDef=()=>{},flightType,children,value}) => {
    return(
        <div  css={divMain}>            
            <input 
                css={inputCheckBoxFlight}                       
                onChange={changeDef}
                value={value}
                type={type}
                checked={flightType}
                placeholder={children}
                aria-label={children}
            />
            <label  css={labelDivMain}  style={{ color : flightType === value ?  "#008cff" :"white" }}><Paragraph>{children}</Paragraph></label>
        </div>        
    )
}

export default CheckBoxFlight