import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ProductCard from "../../components/ProductCard/ProductCard";
import Title from "../../components/Title/Title";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";

const AllProducts = () => {
    const { data, isLoading } = useGetAllProductsQuery(undefined);
    if (isLoading) {
        return <LoadingSpinner />;
    }
    console.log(data);
    return (
        <LayoutWrapper>
            <Title title="View All Cars"></Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </LayoutWrapper>
    );
};

export default AllProducts;
