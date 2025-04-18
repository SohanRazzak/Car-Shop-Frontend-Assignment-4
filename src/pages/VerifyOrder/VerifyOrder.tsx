import { useNavigate, useSearchParams } from "react-router";
import { useVerifyOrderQuery } from "../../redux/features/orders/ordersApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

const VerifyOrder = () => {
    const [searchParams] = useSearchParams();
    const order_id = searchParams.get("order_id");
    const { data, isLoading, isError, error, refetch } =
        useVerifyOrderQuery(order_id);
    const navigate = useNavigate();

    const handlePrint = (elementId: string) => {
        const printSection = document.getElementById(elementId);
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printSection!.innerHTML;
        window.print();
        document.body.innerHTML = originalContent;
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || error) {
        return <ErrorComponent refetch={refetch} />;
    }
    const verificationData = data?.data[0];

    console.log(verificationData);
    return (
        <LayoutWrapper>
            <div id="invoice">
                <SectionHeading
                    title="Payment Verification"
                    subTitle="View your payment verification details"
                />

                {verificationData ? (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Payment Details */}
                                <div>
                                    <h3 className="text-lg font-bold mb-4">
                                        Payment Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Order ID:
                                            </span>
                                            <span className="font-medium">
                                                {
                                                    verificationData.customer_order_id
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Invoice No:
                                            </span>
                                            <span className="font-medium">
                                                {verificationData.invoice_no}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Amount:
                                            </span>
                                            <span className="font-medium">
                                                {verificationData.amount.toLocaleString()}{" "}
                                                {verificationData.currency}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Payment Method:
                                            </span>
                                            <span className="font-medium capitalize">
                                                {verificationData.method.toLowerCase()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Bank Transaction ID:
                                            </span>
                                            <span className="font-medium">
                                                {verificationData.bank_trx_id}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Status:
                                            </span>
                                            <span
                                                className={`badge text-white ${
                                                    verificationData.bank_status ===
                                                    "Success"
                                                        ? "badge-success"
                                                        : "badge-error"
                                                }`}
                                            >
                                                {verificationData.bank_status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Date & Time:
                                            </span>
                                            <span className="font-medium">
                                                {new Date(
                                                    verificationData.date_time
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Details */}
                                <div>
                                    <h3 className="text-lg font-bold mb-4">
                                        Customer Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Name:
                                            </span>
                                            <span className="font-medium">
                                                {verificationData.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Email:
                                            </span>
                                            <span className="font-medium">
                                                {verificationData.email}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Phone:
                                            </span>
                                            <span className="font-medium">
                                                {verificationData.phone_no}
                                            </span>
                                        </div>
                                        {verificationData.card_number && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">
                                                    Card Number:
                                                </span>
                                                <span className="font-medium">
                                                    {verificationData.card_number.replace(
                                                        /\d(?=\d{4})/g,
                                                        "*"
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <h4 className="font-medium text-gray-700">
                                                Address:
                                            </h4>
                                            <div className="flex justify-between flex-col">
                                                <span className="text-gray-500">
                                                    Line 1:{" "}
                                                    {verificationData.address}
                                                </span>
                                                <span className="text-gray-500">
                                                    Line 2:{" "}
                                                    {verificationData.city}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => handlePrint("invoice")}
                                    className="btn btn-outline btn-info hover:text-white uppercase"
                                >
                                    Print Receipt
                                </button>
                                <button
                                    onClick={() => navigate("/customer/dashboard/my-orders")}
                                    className="btn btn-accent text-white uppercase"
                                >
                                    Back to Orders
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <div className="text-5xl mb-4">❌</div>
                        <h3 className="text-xl font-semibold">
                            No verification data found
                        </h3>
                        <p className="text-gray-500">
                            We couldn't verify your payment. Please try again
                            later.
                        </p>
                        <button
                            onClick={() => navigate("/customer/dashboard/my-orders")}
                            className="btn btn-accent text-white uppercase mt-4"
                        >
                            Back to Orders
                        </button>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
};

export default VerifyOrder;
