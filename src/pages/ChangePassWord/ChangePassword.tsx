import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

type TChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const ChangePassword = () => {
  const { register, handleSubmit, reset } = useForm<TChangePasswordForm>();
  const [changePassword] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<TChangePasswordForm> = async (formData) => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      return toast.error("New passwords do not match");
    }

    const toastId = toast.loading("Changing password...");

    try {
      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      toast.success("Password changed successfully", { id: toastId });
      reset();
    } catch (error) {
      toast.error("Failed to change password", { id: toastId });
      console.error(error);
    }
  };

  return (
    <LayoutWrapper>
      <div className="max-w-md mx-auto mt-10 bg-base-100 p-6 shadow-xl rounded-xl">
      <SectionHeading title="Update Password" subTitle="" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Old Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("oldPassword", { required: true })}
              className="input input-bordered w-full"
              placeholder="Old Password"
            />
          </div>

          <div>
            <label className="label">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("newPassword", {
                required: true,
                minLength: 6,
              })}
              className="input input-bordered w-full"
              placeholder="New Password"
            />
          </div>

          <div>
            <label className="label">Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmNewPassword", {
                required: true,
              })}
              className="input input-bordered w-full"
              placeholder="Confirm New Password"
            />
          </div>

          <div className="flex gap-2 items-center mx-1 mt-2">
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <button type="submit" className="btn btn-neutral w-full mt-4">
            Change Password
          </button>
        </form>
      </div>
    </LayoutWrapper>
  );
};

export default ChangePassword;
