import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
    
    return (
        <>
            <Navbar dashboard={false}/>
                <Outlet />
            <Footer/>
        </>
    );
};

export default MainLayout;
