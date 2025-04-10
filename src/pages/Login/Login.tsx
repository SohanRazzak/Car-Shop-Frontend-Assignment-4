import { Link } from "react-router";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [login, {data, isLoading, error}] = useLoginMutation();

    console.log(data);
    if(isLoading){
        return <LoadingSpinner/>
    }

    if(error){
        console.log(error); // handle login failed logic later
    }

    const handleLogin = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form = e.currentTarget;
        const userInfo = {
            email: form.email.value,
            password: form.password.value
        }
        login(userInfo);
        form.reset();
    }
    return (
        <LayoutWrapper>
            <div className="hero bg-base-300 min-h-screen">
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
                            <form onSubmit={(e)=> handleLogin(e)}>
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="Email"
                                    required
                                />
                                <label className="fieldset-label">
                                    Password
                                </label>
                                <input
                                    type={showPassword? 'text' : 'password'}
                                    name="password"
                                    className="input"
                                    placeholder="Password"
                                    required
                                />
                                <div className="flex gap-2 items-center mx-1 mt-2">
                                <input type="checkbox" name="showPassword" id="showPassword" onChange={()=> setShowPassword(!showPassword)}/>
                                <label htmlFor="showPassword">Show Password</label>
                                </div>
                                {/* <div>
                                    <a className="link link-hover">
                                        Forgot password?
                                    </a>
                                </div> */}
                                <button className="btn btn-neutral mt-4 uppercase" type="submit">
                                    Login
                                </button>
                            </fieldset>
                            </form>
                            <hr />
                            <p className="text-center mt-2">Don't have an account? <Link className="text-rose-600 font-bold" to='/signup'>Sign Up Now</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Login;
