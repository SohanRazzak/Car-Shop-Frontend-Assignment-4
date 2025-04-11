import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../../redux/features/products/productApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { TProduct } from "../../types/types";
import LayoutWrapper from "../../layouts/LayoutWrapper";

const ProductDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetProductByIdQuery(id);
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || error) {
        return <ErrorComponent />;
    }
    const currentCar = data.data as TProduct;
    return (
        <LayoutWrapper>
            <div className="mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-lg bg-base-200">
                    <img
                        src={currentCar.image}
                        alt={currentCar.name}
                        onError={(e) => {
                            e.currentTarget.src = "/noImage.png";
                        }}
                        className="w-full h-72 object-cover"
                    />
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-3xl font-bold mt-4">{currentCar.name}</h1>
                    <p className="text-lg text-gray-600 mt-1">
                        {currentCar.brand} - {currentCar.model}
                    </p>
                    <p className="mt-4 text-2xl font-semibold text-accent">
                        ${currentCar.price}
                    </p>


                    {/* Description */}
                    <p className="mt-6 text-gray-700 max-w-10/12">{currentCar.productDetails}</p>

                    {/* Buy Button */}
                    <button className="btn btn-accent text-white uppercase mt-6">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
        </LayoutWrapper>
    );
};

export default ProductDetails;
