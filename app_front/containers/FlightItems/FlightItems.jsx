/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button,Small,Inputs} from "@/components";
import { useEffect, useState } from "react";

const FlightItems = ({flightData}) =>{
    const [buyState,setBuyState] = useState(false)
    const [mature,setMature] = useState(1)
    const [child,setChild] = useState(0)
    const [infant,setInfant] = useState(0)
    const [flightDataReserved,setFlightDataReserved] = useState({})
    const [aquare,setAquire] = useState(false)

    useEffect(()=>{
    },[flightDataReserved])

    const buyItemBehavoiur = ()=>{
        setBuyState(true)
    }

    const deleteItemBehavoiur = ()=>{
        setBuyState(false)
        setAquire(false)
        setFlightDataReserved({})
        setMature(1)
        setChild(0)
        setInfant(0)
    }

    const cancelBuy = ()=>{
        setBuyState(false)
        setMature(1)
        setChild(0)
        setInfant(0)
    }

    const formatToToman = (number) => {
        let setNumber = number * mature
        let childPrice = (number / 2) * child
        let infantPrice = (number / 5) * infant
        if (isNaN(number)) return "نامعتبر";
        
        return new Intl.NumberFormat("fa-IR").format(setNumber + childPrice + infantPrice) + " تومان";
    };

    const submitFlightData = (e) =>{
        if (e){
            e.preventDefault()
        }
        let data = {
            mature:mature,
            child:child,
            infant:infant,
            departure: flightData.departure,
            destination: flightData.destination,
            Stop: flightData.Stop,
            flightTime: flightData.flightTime,
            flightDate: flightData.flightDate,
            duration: flightData.duration,
            Airline: flightData.Airline,
            price: flightData.price,
            ChangeAirline: flightData.ChangeAirline,
            freeOnBoard: flightData.freeOnBoard,
            flightType: flightData.flightType,
            depAirpotAbr: flightData.depAirpotAbr,
            depAirpot: flightData.depAirpot,
            id: flightData.id

        }
        setFlightDataReserved(data)
        setAquire(true)
        setBuyState(false)
    }

    const flighItem = css`
        width: 18rem;
        height: 19rem;
        ${buyState ? "height: 25rem;":"height: 19rem;"}
        display:flex;
        align-items:center;
        justify-content:space-evenly;
        flex-direction:column;
        border:1px solid white;
        ${aquare ? "background-color: rgba(0, 83, 21, 0.644);" : "background-color: rgba(129, 129, 129, 0.24);"}
        border-radius:20px;
        transition:all 600ms ease-in;
        overflow: hidden;
        &:hover{
            box-shadow: 0px 15px 30px #008cff6e;
            scale:1.01;            
        }
        p{
            position: absolute;
            top: 11%;
            left: 68%;
            transform: translate(-50%, -50%);
        }
        position:relative; 
    `;

    const imageAirlineLogo = css`
            width: 100%;
            height: 20%;
            position: absolute;
            top:0;
            background-image:url(${flightData.logo});
            background-size:cover;
            background-position:center;
            background-repeat:no-repeat;

    `
    const flightInfo = css`
            width: 85%;
            height: 73%;
            position: absolute;
            top: 59%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);            
            ${buyState ? "display:none;":"display:flex;"}
            align-items:center;
            justify-content:space-between;
            flex-direction:column;
           
    `

    const flightInfoItem = css`
            width: 100%;
            height: fit-content;
            display:flex;
            align-items:center;
            justify-content:space-between;
            flex-direction:row;
    `
    const flightInConfirm =css`
        width: 100%;
        height: fit-content;
        position: absolute;
        align-items:center;
        flex-direction:column;
        top:30%;
        gap:0;
        justify-content: center;
        ${buyState ? "display:flex;":"display:none;"}
    `

    return(
        <div css={flighItem}>
                <div css={imageAirlineLogo}></div>
                <div css={flightInfo}>
                    <div css={flightInfoItem}>
                        <Small>{flightData.departure}</Small><Small>:</Small><Small>مبدا</Small> 
                    </div>
                    <div css={flightInfoItem}>
                        <Small>{flightData.Stop ? "ندارد":"دارد"}</Small><Small>:</Small><Small>توقف</Small> 
                    </div>
                    <div css={flightInfoItem}>
                    <Small>{flightData.destination}</Small><Small>:</Small><Small>مقصد</Small>
                    </div>
                    <div css={flightInfoItem}>
                    <Small>{flightData.flightDate}</Small><Small>:</Small><Small>روز پرواز</Small>
                    </div>
                    <div css={flightInfoItem}>
                    <Small>{flightData.flightTime}</Small><Small>:</Small><Small>ساعت پرواز</Small>
                    </div>
                    <div css={flightInfoItem}>
                    <Small>{flightData.depAirpotAbr}</Small><Small>:</Small><Small>فرودگاه</Small>
                    </div>
                    <div css={flightInfoItem}>
                    <Small>{formatToToman(flightData.price)}</Small><Small>:</Small><Small>قیمت</Small>
                    </div>
                    {aquare ? 
                        <Button onCliCkAction={deleteItemBehavoiur} type={"button"}>حذف از سبد</Button> 
                        :
                        <Button onCliCkAction={buyItemBehavoiur} type={"button"}>خرید</Button> 
                    }         
                </div>
                <div css={flightInConfirm}>
                    <form onSubmit={submitFlightData}>
                        <div css={css`
                            width: 100%;
                            height: fit-content;
                            margin: 2rem 0;
                        `}>                        
                            <Inputs value={mature} setValue={setMature} type={"number"} label={"بزرگ سال"} name={"mature"} />
                        </div>
                        <div css={css`
                            width: 100%;
                            height: fit-content;
                            margin: 2rem 0;
                        `}>
                            <Inputs value={child} setValue={setChild} type={"number"} label={"کودک"} name={"child"} />
                        </div>
                        <div css={css`
                            width: 100%;
                            height: fit-content;
                            margin: 2rem 0;
                        `}>
                            <Inputs disable={mature === 0 ? true : false} value={mature === 0 ? 0 : infant} setValue={setInfant} type={"number"} label={"نوزاد"} name={"infant"} />
                        </div>     
                        <div css={
                            css`
                                width: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: space-evenly;
                                flex-direction: row;
                                direction: rtl;
                            `
                        }>
                        <Button type={"submit"}>تایید</Button>                      
                        <Button onCliCkAction={cancelBuy} type={"button"}>کنسل</Button>  
                        </div>                                                               
                    </form>                              
                </div>     
           
            </div>    
    )
}

export default FlightItems