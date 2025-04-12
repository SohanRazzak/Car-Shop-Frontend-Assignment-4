import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import LayoutWrapper from "../LayoutWrapper";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    return (
        <>
            <Navbar />
            <LayoutWrapper>
                    <div className="md:hidden mb-5">
                        dedz
                    </div>
                <div className="flex gap-5 pt-5">
                    <div className="min-w-56 min-h-screen hidden md:block mb-5">
                        <Sidebar/>
                    </div>
                    <div className="flex-grow-1 p-4 shadow rounded-lg mb-5">
                        <Outlet />
                    </div>
                </div>
            </LayoutWrapper>
        </>
    );
};

export default DashboardLayout;
