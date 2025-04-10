import { Link } from "react-router";
import LayoutWrapper from "../../layouts/LayoutWrapper";

const SignUp = () => {
    return (
        <LayoutWrapper>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row gap-10">
                    <div className="text-center lg:text-left max-w-2xl">
                        <h1 className="text-5xl font-bold">Signup now!</h1>
                        <p className="py-6 max-w-xl leading-7">
                            Create your account to unlock powerful tools,
                            personalized features, and a seamless experience
                            made for car enthusiasts and dealers alike. Your
                            automotive journey starts here.
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
                            <p className="text-center">
                                Already have and account?{" "}
                                <Link
                                    className="text-rose-600 font-bold"
                                    to="/login"
                                >
                                    Login Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default SignUp;
