import { useParams } from "react-router";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { useGetProductByIdQuery } from "../../redux/features/products/productApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProductDetails = () => {
    const {id} = useParams()
    const { data, isLoading } = useGetProductByIdQuery(id);
    if (isLoading) {
        return <LoadingSpinner />;
    }
    console.log(data.data);
    return <LayoutWrapper>
        dfds
    </LayoutWrapper>;
};

export default ProductDetails;
