import { Link } from "react-router";
import {
    setMyCart,
    clearCart,
    removeCartItem,
    selectCartItems,
} from "../../redux/features/orders/orderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { TProduct } from "../../types/types";

const MyCart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    // getting products
    const { data, isLoading, isError, refetch } =
        useGetAllProductsQuery(undefined);

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorComponent refetch={refetch} />;
    // getting cartItemsWith details
    const cartItemsWithData = cartItems
        .map((item) => {
            const matchedItem = data?.data.find(
                (data: TProduct) => data._id === item.productId
            );
            if (matchedItem) {
                return { ...matchedItem, quantity: item.quantity };
            }
            return null;
        })
        .filter(Boolean);

    // total
    const cartTotal = cartItemsWithData.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // tax
    const taxTotal = cartTotal * .20;

    const handleQuantityChange = (productId: string, increment: number) => {
        dispatch(setMyCart({ productId, quantity: increment }));
    };

    const handleRemoveItem = (productId: string) => {
        dispatch(removeCartItem(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-10 h-[calc(100vh-120px)] grid place-items-center">
                <div className="space-y-1">
                    <div className="text-5xl mb-4">🛒</div>
                    <h3 className="text-xl font-semibold">
                        Your cart is empty
                    </h3>
                    <p className="text-gray-500">
                        Add some items to get started
                    </p>
                    <Link
                        to="/all-cars"
                        className="btn btn-accent uppercase text-white mt-4"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <LayoutWrapper>
            <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex justify-between items-center mt-6 md:mt-10">
                    <SectionHeading
                        title="My Cart"
                        subTitle="Manage your cart items"
                    />
                </div>
                    <button
                        onClick={handleClearCart}
                        className="flex place-self-end btn btn-sm btn-error text-white uppercase"
                    >
                        Clear Cart
                    </button>

                <div className="space-y-4">
                    {cartItemsWithData?.map((item) => (
                        <div key={item._id} className="card bg-base-100 shadow">
                            <div className="card-body">
                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img
                                            src={item.image || "/noImage.png"}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg">
                                            <Link to={`/car/${item._id}`}>
                                                {item.name || "Product"}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-500">
                                            ${item.price.toFixed(2)} each
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-4">
                                        <div className="join">
                                            <button
                                                className="join-item btn btn-square btn-sm"
                                                disabled={item.quantity <= 1}
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item._id,
                                                        -1
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <span className="join-item btn btn-sm btn-disabled no-animation">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="join-item btn btn-square btn-sm"
                                                disabled={
                                                    item.quantity >= item.stock
                                                }
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item._id,
                                                        1
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() =>
                                                handleRemoveItem(item.productId)
                                            }
                                            className="btn btn-sm btn-error text-white uppercase"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-lg font-bold">
                                        BDT{' '}
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="card bg-base-100 shadow mb-6 md:mb-10">
                    <div className="card-body">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Order Summary</h3>
                            <span className="badge badge-warning text-white">
                                {cartItems.reduce(
                                    (total, item) => total + item.quantity,
                                    0
                                )}{" "}
                                items
                            </span>
                        </div>

                        <hr className="h-1 bg-gray-400 border-0 rounded" />


                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>BDT {cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>BDT {taxTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <hr className="text-gray-400 boder-2"/>

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>BDT {(cartTotal + taxTotal).toFixed(2)}</span>
                        </div>

                        <div className="card-actions mt-4 justify-end mx-5 md:mx-1">
                            <Link
                                to="/checkout"
                                className="btn btn-accent w-full md:max-w-1/3 uppercase text-white"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default MyCart;
