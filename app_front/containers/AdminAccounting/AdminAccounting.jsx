/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaUsers,FaCircleUser,FaCode,FaLaptop   } from "react-icons/fa6";
import { useEffect,useState } from "react";

const AdminAccounting = ({show=true}) =>{
    const [activePage, setActivePage] = useState("users");

    const handleClick = (section) => {
        setActivePage(section);
      };

    const mainDivAcc = css`
        display:${show?"flex;":"none;"}
        width:100%;
        height:100%;
        justify-content:center;
        aligne-items:center;
        flex-direction:column;

    `
    const headDivAcc =css `
        border-bottom:1px solid rgb(133, 133, 133);
        width:100%;
        height:10%;
        display:flex;
        justify-content:space-evenly;
        aligne-items:center;
        flex-direction:row-reverse;
        
    `
    const bodyDivAcc =css `
        width:100%;
        height:90%;
        
    `
    const accItems = (active)=>css`
        width:fit-content;
        height:fit-content;
        padding:.5rem;
        border-radius:100%;
        cursor:pointer;
        transition: all 600ms ease-in;
        ${active ?
            "background-color:white; color:rgb(4, 0, 58);"
             :
            "background-color:transparent; color:white;"
            }
        &:hover{
            background-color:white;
            color:rgb(4, 0, 58);
        }
        border:none;
    `

    return(
        <div css={mainDivAcc}>
            <div css={headDivAcc}>
                <button onClick={()=>handleClick("users")} css={accItems(activePage === "users")}>
                    <FaUsers size={40}/>                
                </button>  
                <button onClick={()=>handleClick("profiles")} css={accItems(activePage === "profiles")}>
                    <FaCircleUser size={40}/>                
                </button> 
                <button onClick={()=>handleClick("tempcodes")} css={accItems(activePage === "tempcodes")}>
                    <FaCode  size={40}/>                
                </button> 
                <button onClick={()=>handleClick("devices")} css={accItems(activePage === "devices")}>
                    <FaLaptop  size={40}/>                
                </button> 

            </div>
            {activePage === "users" &&
                <div css={bodyDivAcc}>
                    کاربران
                </div>
            }
            {activePage === "profiles" &&
                <div css={bodyDivAcc}>
                    پروفایل کاربران
                </div>
            }
            {activePage === "tempcodes" &&
                <div css={bodyDivAcc}>
                    لیست کدهای موقت
                </div>
            }
            {activePage === "devices" &&
                <div css={bodyDivAcc}>
                    دستگاهای لاگین شده
                </div>
            }
            
        </div>
    )

}

export default AdminAccounting