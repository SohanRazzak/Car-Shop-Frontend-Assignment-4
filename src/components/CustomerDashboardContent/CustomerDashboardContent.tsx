import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetMeQuery } from "../../redux/features/users/usersApi"; // Assuming you're using redux to fetch user data
import { toast } from "sonner";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import UploadFile from "../../components/UploadFile/UploadFile"; // Assuming this component exists for uploading files
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router";

interface ProfileFormData {
    name: string;
    email: string;
    bio: string;
    imageUrl: string;
}

const CustomerDashboard = () => {
    const {
        data: user,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetMeQuery(undefined); // Fetch user data
    const { register, handleSubmit, reset } = useForm<ProfileFormData>();
    const [imageUrl, setImageUrl] = useState<string>("");
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                bio: user.bio,
                imageUrl: user.imageUrl || "",
            });
            setImageUrl(user.imageUrl || "");
        }
    }, [user, reset]);

    const onSubmit = (data: ProfileFormData) => {
        // Combine the form data with imageUrl and send it to the server
        const updatedData = { ...data, imageUrl };

        // Replace this with your API request logic to update the profile
        console.log("Updated Profile: ", updatedData);
        toast.success("Profile updated successfully!");
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || error) {
        return <ErrorComponent refetch={refetch} />;
    }


    if(user?.role !== 'customer'){
            dispatch(logout())
            return <Navigate to='/login'/>
        }
    return (
        <LayoutWrapper>
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <h2 className="text-3xl font-semibold">Customer Dashboard</h2>

                <div className="border p-4 rounded-lg shadow-md bg-white">
                    <h3 className="text-2xl font-semibold">
                        Profile Information
                    </h3>

                    {/* Profile Info Display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="font-medium">Name</label>
                            <p>{user?.name}</p>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Email</label>
                            <p>{user?.email}</p>
                        </div>

                        <div className="space-y-2 col-span-2">
                            <label className="font-medium">Bio</label>
                            <p>{user?.bio}</p>
                        </div>

                        <div className="col-span-2">
                            <label className="font-medium">Profile Image</label>
                            <div className="flex items-center">
                                <img
                                    src={
                                        imageUrl ||
                                        "https://via.placeholder.com/150"
                                    }
                                    alt="Profile"
                                    className="w-24 h-24 object-cover rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border p-4 rounded-lg shadow-md bg-white">
                    <h3 className="text-2xl font-semibold">Update Profile</h3>

                    {/* Profile Update Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="font-medium">Name</label>
                            <input
                                {...register("name", { required: true })}
                                className="input w-full"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input w-full"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Bio</label>
                            <textarea
                                {...register("bio")}
                                className="textarea w-full"
                                placeholder="Tell us about yourself"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">
                                Upload New Profile Image (optional)
                            </label>
                            <UploadFile
                                onUploadComplete={(url) => setImageUrl(url)}
                                optional={true}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="btn btn-neutral w-full"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default CustomerDashboard;
