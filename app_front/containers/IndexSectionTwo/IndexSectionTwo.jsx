/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mainDivIndxSecTwo } from "./IndexSectionTwoStyle";
import { H1 } from "@/components";
import { useState } from "react";

const IndexSectionTwo = () =>{
    const [selectedSection,setSelectedSection] = useState("no-select")
    const secOne = css`
        height: 100%;
        ${ selectedSection == "no-select" && "width:25%"};
        ${ selectedSection == "one-select" && "width:70%"};
        ${ selectedSection == "two-select" && "width:10%"};
        ${ selectedSection == "three-select" && "width:10%"};
        ${ selectedSection == "four-select" && "width:10%"};
        position: relative;
        transition: all 800ms ease-in;
        background-image:${selectedSection === "one-select" ? "linear-gradient(to bottom right, rgba(0, 6, 61, 0.7) , rgba(0, 6, 61, 0.7)) ,url(./images/secB/secOneMountains.jpg)" :"linear-gradient(to bottom right, rgba(0, 6, 61, 0.38) , rgba(0, 6, 61, 0.38)) ,url(./images/secB/secOneMountains.jpg)" };
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        h1{
            position: absolute;
            top: 69%;
            left: 0;
            transform: ${selectedSection === "one-select" ? "rotate(0)" : "rotate(-90deg)"};
            background-color: #08005363;
            padding: .5rem 2rem;
            width: 10rem;
            height: 3rem;
            text-align: center;
            transition: all 800ms ease-in;
            color: white;
        }
    `

    const selectOne=()=>{
        setSelectedSection("one-select")
    }

    const selectTwo=()=>{
        setSelectedSection("two-select")
    }
    const selectThree=()=>{
        setSelectedSection("three-select")
    }
    const selectFour=()=>{
        setSelectedSection("four-select")
    }

    const selectNone=()=>{
        setSelectedSection("no-select")
    }


    const secTwo = css`
        height: 100%;
        ${ selectedSection == "no-select" && "width:25%"};
        ${ selectedSection == "two-select" && "width:70%"};
        ${ selectedSection == "one-select" && "width:10%"};
        ${ selectedSection == "three-select" && "width:10%"};
        ${ selectedSection == "four-select" && "width:10%"};
        background-image:${selectedSection === "two-select" ? "linear-gradient(to bottom right, rgba(0, 6, 61, 0.7) , rgba(0, 6, 61, 0.7)) ,url(./images/secB/secTwoSeas.jpg)" :"linear-gradient(to bottom right, rgba(0, 6, 61, 0.38) , rgba(0, 6, 61, 0.38)) ,url(./images/secB/secTwoSeas.jpg)" };
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        position: relative;
        transition: all 800ms ease-in;
        h1{
            position: absolute;
            top: 69%;
            left: 0;
            transform: ${selectedSection === "two-select" ? "rotate(0)" : "rotate(-90deg)"};
            background-color: #08005363;
            padding: .5rem 2rem;
            width: 10rem;
            height: 3rem;
            text-align: center;
            transition: all 800ms ease-in;
            color: white;
        }
    `
    const secThree = css`
        height: 100%;
        ${ selectedSection == "no-select" && "width:25%"};
        ${ selectedSection == "three-select" && "width:70%"};
        ${ selectedSection == "one-select" && "width:10%"};
        ${ selectedSection == "two-select" && "width:10%"};
        ${ selectedSection == "four-select" && "width:10%"};
        background-image:${selectedSection === "three-select" ? "linear-gradient(to bottom right, rgba(0, 6, 61, 0.7) , rgba(0, 6, 61, 0.7)) ,url(./images/secB/secThreeSahara.jpg)" :"linear-gradient(to bottom right, rgba(0, 6, 61, 0.38) , rgba(0, 6, 61, 0.38)) ,url(./images/secB/secThreeSahara.jpg)" };
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        position: relative;
        transition: all 800ms ease-in;
        h1{
            position: absolute;
            top: 69%;
            left: 0;
            transform: ${selectedSection === "three-select" ? "rotate(0)" : "rotate(-90deg)"};
            background-color: #08005363;
            padding: .5rem 2rem;
            width: 10rem;
            height: 3rem;
            text-align: center;
            transition: all 800ms ease-in;
            color: white;
        }
    `

    const secFour = css`
        height: 100%;
        ${ selectedSection == "no-select" && "width:25%"};
        ${ selectedSection == "four-select" && "width:70%"};
        ${ selectedSection == "one-select" && "width:10%"};
        ${ selectedSection == "three-select" && "width:10%"};
        ${ selectedSection == "two-select" && "width:10%"};
        background-image:${selectedSection === "four-select" ? "linear-gradient(to bottom right, rgba(0, 6, 61, 0.7) , rgba(0, 6, 61, 0.7)) ,url(./images/secB/secFourJungle.png)" :"linear-gradient(to bottom right, rgba(0, 6, 61, 0.38) , rgba(0, 6, 61, 0.38)) ,url(./images/secB/secFourJungle.png)" };
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        position: relative;
        transition: all 800ms ease-in;
        h1{
            position: absolute;
            top: 69%;
            left: 0;
            transform: ${selectedSection === "four-select" ? "rotate(0)" : "rotate(-90deg)"};
            background-color: #08005363;
            padding: .5rem 2rem;
            width: 10rem;
            height: 3rem;
            text-align: center;
            transition: all 800ms ease-in;
            color: white;
        }

        `
        const logo = css`
            width: fit-content;
            height: fit-content;
            position:absolute;
            top: 69%;
            left: 80%;
            animation: dropDownAnim 2s ease-in;
        `
    return(
        <div css={mainDivIndxSecTwo}>
            <div onClick={selectedSection === "one-select" ? selectNone : selectOne} css={secOne}>
                <H1>کوهستان</H1>
                <div style={{display: selectedSection === "one-select" ? "block" : "none"}} css={logo}>
                    <img src="./images/logoLight.png" alt="Travel Agency"/>
                </div>
            </div>
            <div  onClick={selectedSection === "two-select" ? selectNone : selectTwo} css={secTwo}>
                <H1>دریا</H1>
                <div style={{display: selectedSection === "two-select" ? "block" : "none"}} css={logo}>
                    <img src="./images/logoLight.png" alt="Travel Agency"/>
                </div>
            </div>
            <div onClick={selectedSection === "three-select" ? selectNone : selectThree} css={secThree}>
                <H1>کویر</H1>
                <div style={{display: selectedSection === "three-select" ? "block" : "none"}} css={logo}>
                    <img src="./images/logoLight.png" alt="Travel Agency"/>
                </div>
            </div>
            <div  onClick={selectedSection === "four-select" ? selectNone : selectFour} css={secFour}>
                <H1>جنگل</H1>
                <div style={{display: selectedSection === "four-select" ? "block" : "none"}} css={logo}>
                    <img src="./images/logoLight.png" alt="Travel Agency"/>
                </div>
            </div>
        </div>
    )
}

export default IndexSectionTwo