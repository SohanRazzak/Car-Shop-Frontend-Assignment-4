import { Link, Navigate, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    logout,
    selectCurrentToken,
    selectCurrentUser,
} from "../../redux/features/auth/authSlice";
import { selectCartItems } from "../../redux/features/orders/orderSlice";

const Navbar = () => {
    const token = useAppSelector(selectCurrentToken);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const mycart = useAppSelector(selectCartItems);

    const menuItems = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/all-cars">All Cars</NavLink>
            </li>
            {user?.role && (
                    <li>
                        <NavLink to={`/${user.role}/dashboard`}>
                            Dashboard
                        </NavLink>
                    </li>
            )}
            {
                user?.role === 'customer' && (
                    <li className="indicator">
                    {mycart.length > 0 && <span className="indicator-item badge badge-warning text-white">{mycart.length}</span>}
                        <NavLink to={"/my-cart"}>
                            My Cart
                        </NavLink>
                    </li>
                )
            }
            <li>
                <NavLink to="/about-us">About Us</NavLink>
            </li>
        </>
    );

    const handleLogout = () => {
        dispatch(logout());
        return <Navigate to="/login" />;
    };

    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar p-0 justify-between max-w-7xl mx-auto">
                <div className="navbar bg-base-100">
                    {/* mobile navbar menu */}
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost lg:hidden"
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
                                {menuItems}
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
                    {/* PC Navbar Menu  */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-4 font-semibold">
                            {menuItems}
                        </ul>
                    </div>
                    <div className="navbar-end">
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
        </div>
    );
};

export default Navbar;
