import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
    
    return (
        <>
            <ScrollToTop/>
            <Navbar/>
                <Outlet />
            <Footer/>
        </>
    );
};

export default MainLayout;
