import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto">
                <Outlet />
            </div>
            <Footer/>
        </>
    );
};

export default MainLayout;
