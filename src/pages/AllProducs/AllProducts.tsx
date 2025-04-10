import LayoutWrapper from "../../layouts/LayoutWrapper";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";

const AllProducts = () => {
    const {data, isLoading} = useGetAllProductsQuery(undefined);
    if(isLoading){
        return <div className="h-screen w-full grid place-items-center text-3xl">
            Loading...
        </div>
    }
    console.log(data);
    return (
        <LayoutWrapper>
            <div>AllProducts</div>
        </LayoutWrapper>
    );
};

export default AllProducts;