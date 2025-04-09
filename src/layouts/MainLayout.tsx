import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


import { useEffect } from 'react'
import { themeChange } from 'theme-change'


const MainLayout = () => {
    useEffect(() => {
      themeChange(false)
      // 👆 false parameter is required for react project
    }, [])
    return (
        <>
            <Navbar dashboard={false}/>
                <Outlet />
            <Footer/>
        </>
    );
};

export default MainLayout;
