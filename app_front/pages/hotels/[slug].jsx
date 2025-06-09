/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Head from "next/head";
import {H1,SliderPrice,CheckBoxFlight,SelectInput,Button} from "@/components";
import { useRouter } from "next/router";
import FlightItems from "@/containers/FlightItems/FlightItems";
import flights from "../../public/SampleData/Flights.json"
import { useState } from "react";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from 'moment-jalaali'
import { LuFilter } from "react-icons/lu";
import { LuX } from "react-icons/lu";

const Hotels = () => {
    const [priceRange, setPriceRange] = useState([0, 1305000000]);  
    const [stop,setStop] = useState("all")
    const [dep,setDep] = useState("all")
    const [dest,setDest] = useState("all")
    const [dateStart,setDateStart] = useState("0/0/0/0")
    const [dateEnd,setDateEnd] = useState("1500/12/12")
    const router = useRouter()
    const {slug} = router.query
    const [filterSection,setFilterSection ]= useState(false)

    const stopCheck = (e) =>{
        if(stop){
            setStop(false)
        }else{
           setStop(true)
        }
    }

    const filterDep = (e) =>{
        setDep(e.target.value)
        console.log("DEP",dep)
    }

    const filterDest = (e) =>{
        setDest(e.target.value)
    }


    const handleSliderChange = (value) => {
        setPriceRange(value);
      };


    const dateFilterStart=(e)=>{
        setDateStart(`${e.year}/${e.month.number}/${e.day}`)
    }

    const dateFilterEnd=(e)=>{
        setDateEnd(`${e.year}/${e.month.number}/${e.day}`)
    }

    const mainDivContact = css`
        width:100%;
        height:100vh;
        background-color:rgb(8, 0, 83);
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        color:white;
        position:relative;
        overflow:hidden;
    `

    const headerDivContact = css`
        width:100%;
        height:fit-content;
        display:flex;
        align-items:center;
        justify-content:center;         
        ${slug === "campaings" && "background-image:linear-gradient(to bottom right, rgba(0, 6, 61, 0.48) , rgba(0, 6, 61, 0.48)) ,url(/images/Flights/domflight.png);"} 
        ${slug === "conference" && "background-image:linear-gradient(to bottom right, rgba(0, 6, 61, 0.48) , rgba(0, 6, 61, 0.48)) ,url(/images/Blog/blog.jpg);"} 
        ${slug === "domestic" && "background-image:linear-gradient(to bottom right, rgba(0, 6, 61, 0.48) , rgba(0, 6, 61, 0.48)) ,url(/images/Blog/blog.jpg);"} 
        ${slug === "forigne" && "background-image:linear-gradient(to bottom right, rgba(0, 6, 61, 0.48) , rgba(0, 6, 61, 0.48)) ,url(/images/Blog/blog.jpg);"} 
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        padding:1rem 0;
        position:absolute;
        top:5%;
        animation: topToDown 1s ease-in;
        `
    const sectionFlights = css`
        width: 93%;
        height: 59%;
        overflow-y:auto;
        overflow-x:none;
        display:flex;
        align-items:start;
        justify-content: flex-end;
        flex-direction:row;
        flex-wrap:wrap;
        position:absolute;
        top:${filterSection ? "60%" : "50%"};;
        left: 50%;
        transform:translate(-50%,-50%);
        transition:all 600ms ease-in;
        gap:2rem;
        padding:0 2rem;
    `

    const sectionFilter = css`
        width:100%;
        height: fit-content;
        background-color: ${filterSection ? "rgba(0, 0, 0, 0.57);": "rgba(0, 0, 0, 0.45);"};
        transition:all 600ms ease-in;
        position:absolute;
        top: 13%;
        display:flex;
        flex-direction:row;
        justify-content:space-evenly;
        align-items:center;
        z-index:9;
        
    `

    const itemInput = css`
        height:100%;
        width:fit-content;
        display:${filterSection ? "flex;" : "none;"};
        flex-direction:column;
        justify-content:center;
        align-items:center;
        transition:all 600ms ease-in;
    `

    const btnForFilter = css`
        height:100%;
        width:fit-content;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        transition:all 600ms ease-in;
        margin:1rem 0;
    `

    const resetFilter = ()=>{
        setDateStart("0000/01/01")
        setDateEnd("1500/12/30")
        setStop("all")
        setDep("all")
        setDest("all")
        setPriceRange([0, 1305000000])
    }

    const filterSectionBehvour = () => {
        if(filterSection){
            setFilterSection(false)
        }else{
            setFilterSection(true)
        }
    }

    const iconFilter = css`
        font-size:2rem;
        cursor:pointer;
        transition:all 600ms ease-in;
        &:hover{
            color:#008cff;

        }
    `

    return(
        <>
        <Head>
          <title>سرزمین من | پرواز</title>
          <meta name="description" content="Generated by Ali Mahmoodi" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/icon.ico" />
        </Head>
        <div css={mainDivContact}>
            <div css={headerDivContact}>                
                {slug === "domestic" && <H1>هتلهای داخلی</H1>} 
                {slug === "forigne" && <H1>هتلهای خارجی</H1>} 
                {slug === "conference" && <H1>هتل برای کنفرانس</H1>} 
                {slug === "campaings" && <H1>هتل برای همایشها</H1>}
            </div> 
            <div css={sectionFilter}>
            <div css={btnForFilter}>
                {filterSection ? < LuX css={iconFilter} onClick={filterSectionBehvour}/> : <LuFilter css={iconFilter} onClick={filterSectionBehvour}/>}                    
                </div>
                <div css={itemInput}>
                    <Button type={"button"} onCliCkAction={resetFilter}>حذف فیلترها</Button>
                </div>
                <div css={itemInput}>               
                    {stop === "all" ?
                        <CheckBoxFlight type={"checkbox"} flightType={false} changeDef={stopCheck}>توقف</CheckBoxFlight>
                        :
                        <CheckBoxFlight type={"checkbox"}  changeDef={stopCheck}>توقف</CheckBoxFlight>
                    }   
                </div>
                <div style={{ direction: "rtl",zIndex:"100000" }} css={itemInput}>
                <label> تا تاریخ :</label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  onChange={dateFilterEnd}
                />
                </div> 
                <div style={{ direction: "rtl",zIndex:"100000" }} css={itemInput}>
                <label>از تاریخ :</label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  onChange={dateFilterStart}
                />
                </div>                 
                <div css={itemInput}>
                    <SliderPrice priceRange={priceRange} handleSliderChange={handleSliderChange}/>   
                </div> 
                <div css={itemInput}>                    
                    <SelectInput nameFor={`destination`} packData={flights} label={"مقصد"} filterDep={filterDest}/>
                </div>  
                <div css={itemInput}>                    
                    <SelectInput nameFor={`departure`} packData={flights} label={"مبدا"} filterDep={filterDep}/>
                </div>  
                                                   
            </div>            
            <div css={sectionFlights}>
                
            {flights.map((flight)=>{       
                if(slug === "domflight"){
                    if(stop === "all" && flight.price >= priceRange[0] && flight.price <= priceRange[1] && dep === "all" && moment(flight.flightDate, 'jYYYY/jMM/jDD').isBetween(moment(dateStart, 'jYYYY/jMM/jDD'),moment(dateEnd, 'jYYYY/jMM/jDD'),undefined,'[]')){
                        if(dest === "all"){
                            return(
                                (flight.flightType === "domestic" &&  <FlightItems key={`flight_dom_${flight.id}`} flightData={flight}/>)
                            )
                        }else if(flight.destination === dest){
                            return(
                                (flight.flightType === "domestic" &&  <FlightItems key={`flight_dom_${flight.id}`} flightData={flight}/>)
                            )
                        }else if(flight.date === date){
                            return(
                                (flight.flightType === "domestic" &&  <FlightItems key={`flight_dom_${flight.id}`} flightData={flight}/>)
                            )
                        }
                        
                    }else if(flight.Stop === stop && flight.price >= priceRange[0] && flight.price <= priceRange[1] ){
                        if(dest === "all" && dep ==="all"){
                            return(
                                (flight.flightType === "domestic" &&  <FlightItems key={`flight_dom_${flight.id}`} flightData={flight}/>)
                            )
                        }else if(flight.destination === dest || flight.departure === dep){
                            return(
                                (flight.flightType === "domestic" &&  <FlightItems key={`flight_dom_${flight.id}`} flightData={flight}/>)
                            )
                        }
                        
                    }else if(stop === "all" && flight.price >= priceRange[0] && flight.price <= priceRange[1] && flight.departure === dep){
                        if(dest === "all"){
                            return(
                                (flight.flightType === "domestic" &&  <FlightItems key={`flight_dom_${flight.id}`} flightData={flight}/>)
                            )
                        }else if(flight.destination === dest){
                            return(
                                (flight.flightType === "domestic" &&  <FlightItems key={`flight_dom_${flight.id}`} flightData={flight}/>)
                            )
                        }
                      
                    }      
                }
                if(slug === "forflight"){
                   if(stop === "all" && flight.price >= priceRange[0] && flight.price <= priceRange[1] && dep === "all" && moment(flight.flightDate, 'jYYYY/jMM/jDD').isBetween(moment(dateStart, 'jYYYY/jMM/jDD'),moment(dateEnd, 'jYYYY/jMM/jDD'),undefined,'[]')){
                    if(dest === "all"){
                        return(
                            (flight.flightType === "foriegn" && <FlightItems key={`flight_for_${flight.id}`} flightData={flight}/>)
                        )
                    }else if(flight.destination === dest){
                        return(
                            (flight.flightType === "foriegn" && <FlightItems key={`flight_for_${flight.id}`} flightData={flight}/>)
                        )
                    }else if(flight.date === date){
                        return(
                            (flight.flightType === "foriegn" && <FlightItems key={`flight_for_${flight.id}`} flightData={flight}/>)
                        )
                    }
                    
                }else if(flight.Stop === stop && flight.price >= priceRange[0] && flight.price <= priceRange[1] ){
                    if(dest === "all" && dep ==="all"){
                        return(
                            (flight.flightType === "foriegn" && <FlightItems key={`flight_for_${flight.id}`} flightData={flight}/>)
                        )
                    }else if(flight.destination === dest || flight.departure === dep){
                        return(
                           (flight.flightType === "foriegn" && <FlightItems key={`flight_for_${flight.id}`} flightData={flight}/>)
                        )
                    }
                    
                }else if(stop === "all" && flight.price >= priceRange[0] && flight.price <= priceRange[1] && flight.departure === dep){
                    if(dest === "all"){
                        return(
                            (flight.flightType === "domestic" &&  <FlightItems key={`flight_dom_${flight.id}`} flightData={flight}/>)
                        )
                    }else if(flight.destination === dest){
                        return(
                            (flight.flightType === "domestic" &&  <FlightItems key={`flight_dom_${flight.id}`} flightData={flight}/>)
                        )
                    }
                  
                }  
                }
                if(slug === "cancelations"){
                    return(
                        (flight.flightType === "cancelations" && <FlightItems key={`flight_for_${flight.id}`} flightData={flight}/>)
                   )
                }
                if(slug === "charters"){
                    return(
                        (flight.flightType === "charter" && <FlightItems key={`flight_for_${flight.id}`} flightData={flight}/>)
                   )
                }
            })}
            </div>                                       
        </div>

        </>
        
    )
}

export default Hotels