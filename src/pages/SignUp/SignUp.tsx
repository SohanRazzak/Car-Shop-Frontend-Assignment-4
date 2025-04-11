import { Link, useLocation, useNavigate } from "react-router";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { FormEvent, useEffect, useState } from "react";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [signup] = useSignupMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const token = useAppSelector(selectCurrentToken);

    useEffect(() => {
        if (token) {
            navigate(location.state || "/");
        }
    }, [location.state, navigate, token]);

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toast.loading("Signing Up...", { duration: 2000 });

        try {
            const form = e.currentTarget;
            const newUserInfo = {
                name: form.nameFull.value,
                email: form.email.value,
                password: form.password.value,
                phone: form.phone.value,
                address: form.address.value,
                city: form.address.value,
            };
            await signup(newUserInfo);
            toast.success("Sign Up Success!", { id: toastId });
            return navigate("/login");
            form.reset();
        } catch (error) {
            toast.error("Error: Something went wrong!", { id: toastId });
            console.log(error);
        }
    };
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
                            <form onSubmit={(e) => handleSignUp(e)}>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="nameFull"
                                        className="input"
                                        placeholder="Enter your Name"
                                    />
                                    <label className="fieldset-label">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input"
                                        placeholder="Phone Number"
                                    />
                                    <label className="fieldset-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input"
                                        placeholder="Enter your email"
                                    />
                                    <label className="fieldset-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="input"
                                        placeholder="Enter Address"
                                    />
                                    <label className="fieldset-label">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="input"
                                        placeholder="Enter City"
                                    />
                                    <label className="fieldset-label">
                                        Password
                                    </label>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        className="input"
                                        placeholder="Enter Password"
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
                                        type="submit"
                                        className="btn btn-neutral mt-4 uppercase"
                                    >
                                        Sign me up
                                    </button>
                                </fieldset>
                            </form>
                            <hr />
                            <p className="text-center mt-2">
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
