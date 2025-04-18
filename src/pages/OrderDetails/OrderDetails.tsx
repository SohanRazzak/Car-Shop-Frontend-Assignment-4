import { Link, useParams } from "react-router";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { useGetOrderByIdQuery } from "../../redux/features/orders/ordersApi";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { TOrder } from "../../types/types";

const OrderDetails = () => {
    const { orderId } = useParams();
    const { data, isLoading, isError, error, refetch } =
        useGetOrderByIdQuery(orderId);

    if (isLoading) return <LoadingSpinner />;
    if (isError || error) return <ErrorComponent refetch={refetch} />;

    const order = data?.data as TOrder;

    return (
        <div className="space-y-6">
            <SectionHeading
                title="Order Details"
                subTitle={`Order ID: ${order._id}`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Summary Card */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">
                                    Order Date:
                                </span>
                                <span>
                                    {order.createdAt
                                        ? new Date(
                                              order!.createdAt as string
                                          ).toLocaleString()
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">
                                    Delivery Status:
                                </span>
                                {order.deliveryStatus}
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">
                                    Transaction Status:
                                </span>
                                {order.status}
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">
                                    Total Amount:
                                </span>
                                <span className="text-lg font-bold">
                                    ${order.totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Information Card */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Customer Information</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="avatar">
                                <div className="w-16 rounded-full">
                                    <img
                                        src={order.user.image}
                                        alt={order.user.name}
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">
                                    {order.user.name}
                                </h3>
                                <p className="text-sm">{order.user.email}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Phone:</span>{" "}
                                {order.user.phone}
                            </p>
                            <p>
                                <span className="font-semibold">Address:</span>{" "}
                                {order.user.address}
                            </p>
                            <p>
                                <span className="font-semibold">City:</span>{" "}
                                {order.user.city}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title">Ordered Products</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link
                                                to={`/products/${product.product}`}
                                                className="link link-primary"
                                            >
                                                {product.product}
                                            </Link>
                                        </td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            $
                                            {(
                                                order.totalPrice /
                                                product.quantity
                                            ).toFixed(2)}
                                        </td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Transaction Details */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title">Transaction Details</h2>
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">
                                Transaction ID:
                            </span>{" "}
                            {order.transaction.id}
                        </p>
                        <p>
                            <span className="font-semibold">Status:</span>{" "}
                            {order.status}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Link
                    to="/admin/dashboard/manage-orders"
                    className="btn btn-neutral"
                >
                    Back to Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderDetails;
