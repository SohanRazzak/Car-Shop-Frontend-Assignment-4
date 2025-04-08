import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar max-w-6xl mx-auto">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/all-cars'>All Cars</Link>
                            </li>
                            
                            <li>
                                <Link to='/dashboard'>Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl flex items-center">
                    <img src="../../../public/MotorHiveLogo.svg" alt="MotorHive" 
                    className="w-6 m1"/>
                    MotorHive</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                        <Link to='/'>Home</Link>
                        </li>
                        
                        <li>
                        <Link to='/all-cars'>All Cars</Link>
                        </li>
                        
                        <li>
                            <Link to='/dashboard'>Dashboard</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
