import { Link, NavLink } from "react-router";
import { MdSpaceDashboard } from "react-icons/md";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentToken } from "../../redux/features/auth/authSlice";

type Props = {
    dashboard: boolean;
};

const Navbar = ({ dashboard }: Props) => {
    const token = useAppSelector(selectCurrentToken);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const menuLinks = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/all-cars">All Cars</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
        </>
    );
    const sidebarItems = (
        <>
            {/* Sidebar content here */}
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/add-products">Add New Car</NavLink>
            </li>
        </>
    );

    useEffect(() => {
        themeChange(false);
        // 👆 false parameter is required for react project
    }, []);
    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar justify-between max-w-7xl mx-auto">
                {dashboard && (
                    <>
                        <div className="drawer w-18 mx-4">
                            <input
                                id="my-drawer"
                                type="checkbox"
                                className="drawer-toggle"
                            />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label
                                    htmlFor="my-drawer"
                                    className="btn btn-accent drawer-button hidden lg:flex"
                                >
                                    <MdSpaceDashboard size={"20"} />
                                </label>
                            </div>
                            <div className="drawer-side">
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    className="drawer-overlay"
                                ></label>
                                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 font-semibold">
                                    {sidebarItems}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden -ml-20"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {" "}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />{" "}
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold"
                        >
                            {menuLinks}
                            {sidebarItems}
                        </ul>
                    </div>
                    <Link
                        to="/"
                        className="btn btn-ghost text-xl flex items-center"
                    >
                        <img
                            src="/MotorHiveLogo.svg"
                            alt="MotorHive"
                            className="w-6 m1"
                        />
                        MotorHive
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold gap-3">
                        {menuLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* Theme controller */}
                    <label className="swap swap-rotate mx-4">
                        {/* this hidden checkbox controls the state */}
                        <input
                            type="checkbox"
                            className="theme-controller"
                            value="dark"
                            data-toggle-theme="dark,light"
                        />

                        {/* sun icon */}
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    {token ? (
                        <Link
                            onClick={handleLogout}
                            to="/login"
                            className="btn btn-error text-white uppercase"
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="btn btn-error text-white uppercase"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
