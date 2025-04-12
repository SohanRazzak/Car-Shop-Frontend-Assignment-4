import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import UploadFile from "../../components/UploadFile/UploadFile";
import { useGetMeQuery, useUpdateProfileMutation } from "../../redux/features/users/usersApi";
import { toast } from "sonner";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { TUser } from "../../types/types";
import SectionHeading from "../../components/SectionHeading/SectionHeading";


const UpdateProfile = () => {
    const { data: user, isLoading, isError, error, refetch } = useGetMeQuery(undefined);
    const [updateProfile] = useUpdateProfileMutation();
    const [imageUrl, setImageUrl] = useState<string>("");

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (user?.data) {
            const { name, phone, address, city, image } = user.data;
            reset({ name, phone, address, city });
            setImageUrl(image || "");
        }
    }, [user, reset]);

    const onSubmit = async (formData: Partial<TUser>) => {
        const toastId = toast.loading("Updating profile...");

        const updatedProfile = {
            ...formData,
            image: imageUrl,
        };

        try {
            await updateProfile(updatedProfile).unwrap();
            toast.success("Profile updated!", { id: toastId });
        } catch (err) {
            toast.error("Update failed", { id: toastId });
            console.error(err);
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError || error) return <ErrorComponent refetch={refetch} />;


    return (
        <LayoutWrapper>
            <div className="max-w-md mx-auto mt-10 bg-base-100 p-6 shadow-xl rounded-xl">
            <SectionHeading title="Update Profile" subTitle="" />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="label">Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label className="label">Phone</label>
                        <input
                            {...register("phone", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Phone Number"
                        />
                    </div>

                    <div>
                        <label className="label">Address</label>
                        <input
                            {...register("address", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Address"
                        />
                    </div>

                    <div>
                        <label className="label">City</label>
                        <input
                            {...register("city", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="City"
                        />
                    </div>

                    <div>
                        <label className="label">Profile Image</label>
                        <UploadFile
                            onUploadComplete={(url) => setImageUrl(url)}
                            optional={true}
                        />
                    </div>

                    <button className="btn btn-neutral w-full" type="submit">
                        Save Changes
                    </button>
                </form>
            </div>
        </LayoutWrapper>
    );
};

export default UpdateProfile;
