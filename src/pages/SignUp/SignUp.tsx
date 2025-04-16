import { Link, useNavigate } from "react-router";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { FormEvent, useState } from "react";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [signup] = useSignupMutation();
    const [isWeakPassword, setIsWeakPassword] = useState(false);
    const navigate = useNavigate();
    const checkStrongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const password = form.password.value;

        if (!checkStrongPassword.test(password)) {
            console.log(password);
            return setIsWeakPassword(true);
            console.log(password, 2);
        }

        const toastId = toast.loading("Signing Up...", { duration: 2000 });

        try {
            const newUserInfo = {
                name: form.nameFull.value,
                email: form.email.value,
                password,
                phone: form.phone.value,
                address: form.address.value,
                city: form.address.value,
            };
            await signup(newUserInfo).unwrap();
            toast.success("Sign Up Success!", { id: toastId });
            form.reset();
            return navigate("/login");
        } catch (error) {
            toast.error("Error: Something went wrong!", { id: toastId });
            console.log(error);
        }
    };
    return (
        <LayoutWrapper>
            <div className="flex px-2 py-5 md:py-8 items-center justify-center mx-auto">
                <div className="flex items-center min-h-screen justify-center flex-col lg:flex-row gap-10">
                    <div className=" lg:text-left max-w-xl grow-0 shrink-0">
                        <h1 className="text-5xl font-bold">Signup now!</h1>
                        <p className="py-6 max-w-xl leading-7">
                            Create your account to unlock powerful tools,
                            personalized features, and a seamless experience
                            made for car enthusiasts and dealers alike. Your
                            automotive journey starts here.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full min-h-screen max-w-sm shrink-0 shadow-2xl">
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
                                        required

                                    />
                                    <label className="fieldset-label">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input"
                                        placeholder="Phone Number"
                                        required

                                    />
                                    <label className="fieldset-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input"
                                        placeholder="Enter your email"
                                        required

                                    />
                                    <label className="fieldset-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="input"
                                        placeholder="Enter Address"
                                        required

                                    />
                                    <label className="fieldset-label">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="input"
                                        placeholder="Enter City"
                                        required

                                    />
                                    <label className="fieldset-label">
                                        Password
                                    </label>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        onChange={()=> setIsWeakPassword(false)}
                                        name="password"
                                        className="input"
                                        placeholder="Enter Password"
                                        required
                                    />
                                    {isWeakPassword && <p className="text-red-500 m-1 pr-4">Password must contain at least one upercase, loowercase and special character (i.e: @$!%*?&)</p>}
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
