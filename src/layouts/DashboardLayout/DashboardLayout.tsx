import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import LayoutWrapper from "../LayoutWrapper";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    return (
        <>
            <Navbar />
            <LayoutWrapper>
                <div className="flex gap-5 *:border border-2">
                    <div className="min-w-64 min-h-screen">
                        <Sidebar/>
                    </div>
                    <div className="flex-grow-1">
                        <Outlet />
                    </div>
                </div>
            </LayoutWrapper>
        </>
    );
};

export default DashboardLayout;
