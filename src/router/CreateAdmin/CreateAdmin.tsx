import LayoutWrapper from "../../layouts/LayoutWrapper";
import { FormEvent, useState } from "react";
import { useCreateAdminMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import Title from "../../components/Title/Title";

const CreateAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [signup] = useCreateAdminMutation();
    const [isWeakPassword, setIsWeakPassword] = useState(false);
    const checkStrongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const password = form.password.value;

        if (!checkStrongPassword.test(password)) {
            return setIsWeakPassword(true);
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
        } catch (error) {
            toast.error("Error: Something went wrong!", { id: toastId });
            console.log(error);
        }
    };
    return (
        <LayoutWrapper>
            <Title title="Create Admin"/>
            <div className="flex px-2 py-5 md:py-8 items-center justify-center mx-auto">
                <div className="flex items-center min-h-screen justify-center flex-col w-full lg:flex-row gap-10">
                    <div className="bg-base-100 w-full min-h-screen max-w-sm shrink-0 shadow-2xl">
                        <div className="w-full p-3 md:p-6">
                            <form onSubmit={(e) => handleSignUp(e)}>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="nameFull"
                                        className="input input-bordered w-full"
                                        placeholder="Enter your Name"
                                        required
                                    />
                                    <label className="fieldset-label">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input input-bordered w-full"
                                        placeholder="Phone Number"
                                        required
                                    />
                                    <label className="fieldset-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input input-bordered w-full"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <label className="fieldset-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="input input-bordered w-full"
                                        placeholder="Enter Address"
                                        required
                                    />
                                    <label className="fieldset-label">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="input input-bordered w-full"
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
                                        onChange={() =>
                                            setIsWeakPassword(false)
                                        }
                                        name="password"
                                        className="input input-bordered w-full"
                                        placeholder="Enter Password"
                                        required
                                    />
                                    {isWeakPassword && (
                                        <p className="text-red-500 m-1 pr-4">
                                            Password must contain at least one
                                            upercase, loowercase and special
                                            character (i.e: @$!%*?&)
                                        </p>
                                    )}
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
                                        Sign up an Admin
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default CreateAdmin;
