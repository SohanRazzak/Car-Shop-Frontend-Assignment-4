import { useState } from "react";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { TProduct } from "../../types/types";
import { setMyCart } from "../../redux/features/orders/orderSlice";
import { useGetProductByIdQuery } from "../../redux/features/products/productApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { toast } from "sonner";

const ProductDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error, refetch } =
        useGetProductByIdQuery(id);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || error) {
        return <ErrorComponent refetch={refetch} />;
    }
    const currentCar = data.data as TProduct;

    const handleAddToCart = () => {
        dispatch(
            setMyCart({
                productId: currentCar._id,
                quantity,
            })
        );
        toast.success(`${currentCar.name}, Qty. ${quantity} added to Cart`,{duration: 2000})
    };

    const increaseQuantity = () => {
        if (quantity < currentCar.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <LayoutWrapper>
            <div className="card lg:card-side gap-5 my-6 lg:my-8 bg-base-100 shadow-xl">
                <figure className="lg:w-1/2 p-4 md:p-6">
                    <img
                        src={currentCar.image}
                        alt={currentCar.name}
                        onError={(e)=> e.currentTarget.src = "/noImage.png"}
                        className="w-full h-full rounded-2xl object-cover"
                    />
                </figure>
                <div className="card-body lg:w-1/2">
                    <h1 className="card-title text-3xl font-bold">
                        {currentCar.name} {currentCar.isFeatured && <span className="badge badge-accent text-white">Featured</span>}
                    </h1>
                    <div className="flex flex-row gap-3">
                    <div className="badge badge-primary">
                        {currentCar.brand}
                    </div>
                    <div className="badge badge-secondary">
                        {currentCar.model}
                    </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-2xl font-bold">
                            BDT {currentCar.price.toLocaleString()}/-
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {currentCar.stock > 0
                                ? `${currentCar.stock} in stock`
                                : "Out of stock"}
                        </p>
                    </div>

                    <div className="card-actions flex-col gap-5 justify-between mt-4">
                        {/* Quantity Selector */}
                        <div className="join">
                            <button
                                className="join-item btn btn-square btn-sm"
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <button className="join-item btn btn-sm btn-disabled text-gray-900 no-animation">
                                {quantity}
                            </button>
                            <button
                                className="join-item btn btn-square btn-sm"
                                onClick={increaseQuantity}
                                disabled={quantity >= currentCar.stock}
                            >
                                +
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                className="btn btn-primary uppercase"
                                onClick={handleAddToCart}
                                disabled={currentCar.stock <= 0}
                            >
                                Add to Cart
                            </button>
                            <Link to="/checkout" className="btn btn-accent text-white uppercase">
                                Buy Now
                            </Link>
                        </div>
                    </div>

                    {/* Product Specifications */}
                    <div className="mt-6 space-y-2">
                        <h3 className="font-bold">Specifications</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Brand
                                </p>
                                <p>{currentCar.brand}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Category
                                </p>
                                <p>{currentCar.category}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Model Year
                                </p>
                                <p>{currentCar.year}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            <div className="card-body my-8 shadow-2xl">
            <h3 className="border-y-2 py-4 text-gray-800 text-3xl font-semibold font-mono text-center mt-5">Product Details</h3>
            <p className="py-5 md:p-8">{currentCar.productDetails}</p>
            </div>
        </LayoutWrapper>
    );
};

export default ProductDetails;
