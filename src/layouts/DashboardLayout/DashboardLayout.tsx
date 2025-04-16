import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import LayoutWrapper from "../LayoutWrapper";
import Sidebar from "./Sidebar";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const DashboardLayout = () => {
    return (
        <>
            <Navbar />
            <LayoutWrapper>
                <ScrollToTop/>
                {/* mobile version  */}
                <div className="md:hidden mb-5">
                    <div className="drawer place-items-center -mb-4">
                        <input
                            id="my-drawer"
                            type="checkbox"
                            className="drawer-toggle"
                        />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label
                                htmlFor="my-drawer"
                                className="btn btn-accent uppercase text-white drawer-button mt-4"
                            >
                                Open Dashboard Menu
                            </label>
                        </div>
                        <div className="drawer-side bg-base-100 z-[999999]">
                            <label
                                htmlFor="my-drawer"
                                aria-label="close sidebar"
                                className="drawer-overlay"
                            ></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 z-">
                                {/* Sidebar content here */}
                                <Sidebar />
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Pc version  */}
                <div className="flex gap-5 pt-5">
                    <div className="min-w-56 min-h-screen hidden md:block mb-5">
                        <Sidebar />
                    </div>
                    <div className="flex-grow-1 p-4 shadow rounded-lg mb-5 overflow-x-auto">
                        <Outlet />
                    </div>
                </div>
            </LayoutWrapper>
        </>
    );
};

export default DashboardLayout;
