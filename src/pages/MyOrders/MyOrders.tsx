import { Link } from "react-router";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { TOrder } from "../../types/types";
import { useGetMyOrdersQuery } from "../../redux/features/orders/ordersApi";
import LayoutWrapper from "../../layouts/LayoutWrapper";

const MyOrders = () => {
    const { data, isLoading, error, isError, refetch } = useGetMyOrdersQuery(undefined);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || error) {
        return <ErrorComponent refetch={refetch} />;
    }

    const orders = (data?.data as TOrder[]) || [];

    return (
        <LayoutWrapper>
            <SectionHeading
                title="My Orders"
                subTitle="View your order history"
            />

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id} className="hover:bg-base-200">
                                <td>{index + 1}</td>
                                <td>
                                    <div className="font-mono font-semibold">...{order._id.slice(-6)}</div>
                                </td>
                                <td>
                                    {order.createdAt ? new Date(order.createdAt as string).toLocaleDateString() : 'N/A'}
                                </td>
                                <td>
                                    <div className="flex flex-wrap gap-1">
                                        {order.products.map((item, idx) => (
                                            <div key={idx} className="badge badge-outline">
                                                {item.quantity}x
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>
                                    <span className={`badge text-white ${
                                        order.deliveryStatus === 'Delivered' ? 'badge-success' :
                                        order.deliveryStatus === 'Cancelled' ? 'badge-error' :
                                        'badge-warning'
                                    }`}>
                                        {order.deliveryStatus}
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        to={`/customer/dashboard/order-details/${order._id}`}
                                        className="btn btn-sm btn-accent text-white uppercase"
                                    >
                                        View Details
                                    </Link>
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
                        Your orders will appear here once you make a purchase.
                    </p>
                    <Link to="/products" className="btn btn-primary mt-4">
                        Browse Products
                    </Link>
                </div>
            )}
        </LayoutWrapper>
    );
};

export default MyOrders;