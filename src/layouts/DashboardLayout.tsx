
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const DashboardLayout = () => {
    return (
        <div>
            <Navbar dashboard={true}/>
            <Outlet/>
        </div>
    );
};

export default DashboardLayout;