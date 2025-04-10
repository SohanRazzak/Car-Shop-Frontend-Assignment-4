import { Link } from "react-router";
import LayoutWrapper from "../../layouts/LayoutWrapper";

const Login = () => {
    return (
        <LayoutWrapper>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                    <div className="text-center lg:text-left max-w-2xl">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6 max-w-xl leading-7">
                        Manage your car listings, track purchases, and stay in control of your automotive journey
                        — all in one place.
                        <br />
                        Whether you're buying, selling, or just exploring, we’ve got the tools you need under one dashboard.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="Email"
                                />
                                <label className="fieldset-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Password"
                                />
                                <div>
                                    {/* <a className="link link-hover">
                                        Forgot password?
                                    </a> */}
                                </div>
                                <button className="btn btn-neutral mt-4 uppercase">
                                    Login
                                </button>
                            </fieldset>
                            <hr />
                            <p className="text-center">Don't have an account? <Link className="text-rose-600 font-bold" to='/signup'>Sign Up Now</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Login;
