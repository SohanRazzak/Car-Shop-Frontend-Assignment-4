import { Link } from "react-router";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import { TProduct } from "../../types/types";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ProductCard from "../ProductCard/ProductCard";
import SectionHeading from "../SectionHeading/SectionHeading";

const FeaturedProduct = () => {
    const { data, isLoading, isError, error, refetch } =
        useGetAllProductsQuery(undefined);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || error) {
        return <ErrorComponent refetch={refetch}/>;
    }

    const allCars = data.data as TProduct[];

    return (
        <LayoutWrapper>
            <section className="my-8 bg-base-100">
                <div className="mx-auto px-4 flex flex-col">
                    <SectionHeading
                        title="Featured Cars"
                        subTitle="Exclusive and Just Arrived Models"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[768px] lg:max-w-full mx-auto gap-4 mb-5 md:mb-8 place-items-center">
                        {allCars.map((car) => (
                            <ProductCard key={car._id} car={car} />
                        ))}
                    </div>
                    <Link to="/all-cars" className=" mx-auto">
                        <button className="btn btn-accent uppercase text-white">
                            View All Car
                        </button>
                    </Link>
                </div>
            </section>
        </LayoutWrapper>
    );
};

export default FeaturedProduct;
