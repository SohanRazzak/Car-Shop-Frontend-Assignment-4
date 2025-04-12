import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import UploadFile from "../../components/UploadFile/UploadFile";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import {
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from "../../redux/features/products/productApi";
import { toast } from "sonner";
import { TProduct } from "../../types/types";
import { carCategories } from "../../const/constants";
import { useParams } from "react-router";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const UpdateProduct = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, error, refetch } =
        useGetProductByIdQuery(id);
    const [updateProduct] = useUpdateProductMutation();
    const [imageUrl, setImageUrl] = useState<string>("");

    const { register, handleSubmit, reset } = useForm<TProduct>();

    useEffect(() => {
        if (data?.data) {
            reset(data.data);
            setImageUrl(data.data.imageUrl);
        }
    }, [data, reset]);

    const onSubmit = (updatedData: TProduct) => {

        const updatedProduct = { ...updatedData, imageUrl };
        updateProduct({ id, updatedProduct })
            .unwrap()
            .then(() => toast.success("Product updated successfully!"))
            .catch(() => toast.error("Update failed"));
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError || error) return <ErrorComponent refetch={refetch} />;

    return (
        <LayoutWrapper>
            <SectionHeading title="Update Product" subTitle="" />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center"
            >
                {/* Name */}
                <div className="w-full">
                    <label className="label">Name</label>
                    <input
                        {...register("name", { required: true })}
                        className="input w-full"
                    />
                </div>

                {/* Brand */}
                <div className="w-full">
                    <label className="label">Brand</label>
                    <input
                        {...register("brand", { required: true })}
                        className="input w-full"
                    />
                </div>

                {/* Model */}
                <div className="w-full">
                    <label className="label">Model</label>
                    <input
                        {...register("model", { required: true })}
                        className="input w-full"
                    />
                </div>

                {/* Price */}
                <div className="w-full">
                    <label className="label">Price</label>
                    <input
                        type="number"
                        {...register("price", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        className="input w-full"
                    />
                </div>

                {/* Year */}
                <div className="w-full">
                    <label className="label">Year</label>
                    <input
                        type="number"
                        {...register("year", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        className="input w-full"
                    />
                </div>

                {/* Category */}
                <div className="w-full">
                    <label className="label">Category</label>
                    <select {...register("category")} className="select w-full">
                        {carCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stock */}
                <div className="w-full">
                    <label className="label">Stock</label>
                    <input
                        type="number"
                        {...register("stock", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        className="input w-full"
                    />
                </div>

                {/* Upload File */}
                <div className="w-full">
                    <label className="label">Upload New Image (optional)</label>
                    <UploadFile onUploadComplete={(url) => setImageUrl(url)} optional={true}/>
                    {/* {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="preview"
                            className="w-32 h-32 object-cover mt-2 rounded"
                        />
                    )} */}
                </div>

                {/* Product Details */}
                <div className="w-full md:col-span-2 lg:col-span-3">
                    <label className="label">Product Details</label>
                    <textarea
                        {...register("productDetails", { required: true })}
                        className="textarea w-full"
                    />
                </div>

                <button className="btn btn-neutral uppercase md:col-span-2 lg:col-span-3 mt-4">
                    Update Product
                </button>
            </form>
        </LayoutWrapper>
    );
};

export default UpdateProduct;
