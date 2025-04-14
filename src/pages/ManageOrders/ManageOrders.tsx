// import { useEffect } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "sonner";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { TOrder } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { setOrders } from "../../redux/features/orders/orderSlice";
import {
    useDeleteOrderMutation,
    useGetOrdersQuery,
    useUpdateOrderDeliveryStatusMutation,
} from "../../redux/features/orders/ordersApi";
import { useEffect } from "react";
import LayoutWrapper from "../../layouts/LayoutWrapper";

const ManageOrders = () => {
    const { data, isLoading, error, isError, refetch } =
        useGetOrdersQuery(undefined);
    const [updateDeliveryStatus] = useUpdateOrderDeliveryStatusMutation();
    const [deleteOrder] = useDeleteOrderMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data?.data) {
            dispatch(setOrders(data.data));
        }
    }, [data, dispatch]);

    const handleDeliveryStatusUpdate = async (
        id: string,
        newStatus: string
    ) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Change delivery status to ${newStatus}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        });

        if (result.isConfirmed) {
            try {
                await updateDeliveryStatus({ id, deliveryStatus: newStatus }).unwrap();
                toast.success(`Delivery status updated to ${newStatus}`);
            } catch (err) {
                toast.error("Failed to update delivery status");
                console.error(err);
            }
        }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await deleteOrder(id).unwrap();
                toast.success("Order deleted successfully");
                refetch();
            } catch (err) {
                toast.error("Failed to delete order");
                console.error(err);
            }
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || error) {
        return <ErrorComponent refetch={null} />;
    }

    const orders = (data?.data as TOrder[]) || [];

    return (
        <LayoutWrapper>
            <SectionHeading
                title="Manage Orders"
                subTitle="View and manage all customer orders"
            />

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table w-full table-zebra">
                    <thead>
                        <tr className="bg-base-200">
                        <th>#</th>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Qty.</th>
                            <th>Total</th>
                            <th>Transaction</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id} className="hover:bg-base-200">
                                <td>{index + 1}</td>
                                <td>
                                    <div className="font-bold">
                                        ...{order._id.slice(-6)}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">
                                            {order.user?.name || "Unknown"}
                                        </div>
                                        <div className="text-sm opacity-50">
                                            {order.user?.email}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {order.createdAt ? new Date(order.createdAt as string).toLocaleDateString() : 'N/A'}
                                </td>
                                <td>
                                    <div className="flex flex-wrap gap-1">
                                        {order.products
                                            .slice(0, 3)
                                            .map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="badge badge-outline"
                                                >
                                                    {item.quantity}x
                                                </div>
                                            ))}
                                        {order.products.length > 3 && (
                                            <div className="badge badge-ghost">
                                                +{order.products.length - 3}{" "}
                                                more
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>
                                    <span className="badge badge-warning text-white">
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        className="select select-bordered select-sm"
                                        value={order.deliveryStatus}
                                        onChange={(e) =>
                                            handleDeliveryStatusUpdate(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">
                                            Processing
                                        </option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">
                                            Delivered
                                        </option>
                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/admin/dashboard/order-details/${order._id}`}
                                        >
                                            <button className="btn btn-sm btn-info text-white uppercase"
                                            >
                                                Details
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(order._id)
                                            }
                                            className="btn btn-sm btn-error text-white uppercase"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <div className="text-center py-10">
                    <div className="text-5xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold">No orders found</h3>
                    <p className="text-gray-500">
                        When customers place orders, they'll appear here.
                    </p>
                </div>
            )}
        </LayoutWrapper>
    );
};

export default ManageOrders;
