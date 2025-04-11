import { Link } from "react-router";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { useState } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { SubmitHandler, useForm } from "react-hook-form";
import { TLoginInput } from "../../types/auth.types";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [login, { isLoading, error }] = useLoginMutation();
    const { register, handleSubmit, reset } = useForm<TLoginInput>();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        console.log(error); // handle login failed logic later
    }

    const handleLogin: SubmitHandler<TLoginInput> = async (userInfo) => {
        const res = await login(userInfo).unwrap();
        const user = verifyToken(res.data.accessToken);
        dispatch(setUser({
            user: user,
            token: res.data.accessToken
        }))
        reset();
    };
    return (
        <LayoutWrapper>
            <div className="hero bg-base-300 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                    <div className="text-center lg:text-left max-w-2xl">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6 max-w-xl leading-7">
                            Manage your car listings, track purchases, and stay
                            in control of your automotive journey — all in one
                            place.
                            <br />
                            Whether you're buying, selling, or just exploring,
                            we’ve got the tools you need under one dashboard.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            {/* React hook form  */}

                            <form onSubmit={handleSubmit(handleLogin)}>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: true,
                                        })}
                                        className="input"
                                        placeholder="Email"
                                        required
                                    />
                                    <label className="fieldset-label">
                                        Password
                                    </label>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        {...register("password", {
                                            required: true,
                                        })}
                                        className="input"
                                        placeholder="Password"
                                        required
                                    />
                                    <div className="flex gap-2 items-center mx-1 mt-2">
                                        <input
                                            type="checkbox"
                                            name="showPassword"
                                            id="showPassword"
                                            onChange={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                        <label htmlFor="showPassword">
                                            Show Password
                                        </label>
                                    </div>

                                    <button
                                        className="btn btn-neutral mt-4 uppercase"
                                        type="submit"
                                    >
                                        Login
                                    </button>
                                </fieldset>
                            </form>

                            <hr />
                            <p className="text-center mt-2">
                                Don't have an account?{" "}
                                <Link
                                    className="text-rose-600 font-bold"
                                    to="/signup"
                                >
                                    Sign Up Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Login;
