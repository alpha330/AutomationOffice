import React from "react";
import { Header,Footer } from "@/components";


const Layout = ({children}) => {
    return(
        <>
        <Header/>
            {children}
        <Footer/>
        </>
        
    )
}

export default Layout