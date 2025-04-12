import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ProductCard from "../../components/ProductCard/ProductCard";
import Title from "../../components/Title/Title";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import { setProducts } from "../../redux/features/products/productSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TProduct } from "../../types/types";

const AllProducts = () => {
    const { data, isLoading, isError, error, refetch } =
        useGetAllProductsQuery(undefined);
    const dispatch = useAppDispatch();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || error) {
        return <ErrorComponent refetch={refetch}/>;
    }

    const allCars = data.data as TProduct[];
    dispatch(setProducts(allCars));
    return (
        <LayoutWrapper>
            <Title title="View All Cars"></Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[768px] lg:max-w-full mx-auto gap-4 my-5 md:my-8 place-items-center">
                {allCars.map((car) => (
                    <ProductCard key={car._id} car={car} />
                ))}
            </div>
        </LayoutWrapper>
    );
};

export default AllProducts;
