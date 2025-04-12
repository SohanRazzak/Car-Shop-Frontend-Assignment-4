import { useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import {
    useBlockUserMutation,
    useGetAllUsersQuery,
} from "../../redux/features/users/usersApi";
import { TUser } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { setUsers } from "../../redux/features/users/usersSlice";

const ManageUsers = () => {
    const { data, isLoading, isError, refetch } =
        useGetAllUsersQuery(undefined);
    const [blockUser] = useBlockUserMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data?.data) {
            dispatch(setUsers(data.data));
        }
    }, [data, dispatch]);

    const handleStatusChange = async (user: TUser, newStatus: string) => {
        if (user.status === newStatus) return;

        const confirm = await Swal.fire({
            title: `Are you sure?`,
            text: `Change status to ${newStatus}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            await blockUser({ id: user._id, status: newStatus }).unwrap();
            toast.success(`User marked as ${newStatus}`);
            refetch();
        } catch (error) {
            toast.error("Failed to update status");
            console.error(error);
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorComponent refetch={refetch} />;

    const usersList: TUser[] = data?.data || [];

    return (
        <LayoutWrapper>
            <SectionHeading
                title="Manage Users"
                subTitle="All registered users"
            />
            <div className="overflow-x-auto w-full">
                <table className="table w-full table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name || "N/A"}</td>
                                <td>{user.email}</td>
                                <td>{user.role || "user"}</td>
                                <td>
                                    <select
                                        className="select select-bordered select-sm"
                                        value={user.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                user,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="active">Active</option>
                                        <option value="deactive">
                                            Deactive
                                        </option>
                                    </select>
                                </td>
                                <td className="text-right">
                                    <button
                                        onClick={() =>
                                            handleStatusChange(
                                                user,
                                                user.status === "active"
                                                    ? "deactive"
                                                    : "active"
                                            )
                                        }
                                        className="btn btn-sm btn-warning text-white"
                                    >
                                        Toggle Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LayoutWrapper>
    );
};

export default ManageUsers;
