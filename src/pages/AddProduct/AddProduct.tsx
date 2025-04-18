import { useForm } from "react-hook-form";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { TProduct } from "../../types/types";
import UploadFile from "../../components/UploadFile/UploadFile";
import { useState } from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { carCategories } from "../../const/constants";
import { toast } from "sonner";
import { useCreateProductMutation } from "../../redux/features/products/productApi";

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm<TProduct>();
    const [fileUrl, setfileURL] = useState<string>("");
    const [isFeatured, setIsFeatured] = useState<boolean>(false);
    const [createProduct] = useCreateProductMutation();

    const handleAddProduct = async (data: TProduct) => {
        if (!fileUrl) {
            return toast.error("Please upload an Image!", { duration: 2000 });
        }

        const toastId = toast.loading("Adding New Product")
    
        const inStock = data.stock > 0;
        const newProduct = {
            ...data,
            image: fileUrl,
            isFeatured,
            inStock,
        };
    
        try {
            await createProduct(newProduct).unwrap();
            toast.success("Product added successfully!",{id: toastId});
            reset()
        } catch (error) {
            toast.error("Failed to add product", {id: toastId});
            console.log(error);
        }
    };
    
    return (
        <LayoutWrapper>
            <SectionHeading title="Add New Car" subTitle="" />
            <form
                onSubmit={handleSubmit(handleAddProduct)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center"
            >
                {/* Name */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Name</label>
                    <input
                        type="name"
                        {...register("name", {
                            required: true,
                        })}
                        className="input w-full"
                        placeholder="Name"
                        required
                    />
                </div>

                {/* brand  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Brand</label>
                    <input
                        type="brand"
                        {...register("brand", {
                            required: true,
                        })}
                        className="input w-full"
                        placeholder="Brand"
                        required
                    />
                </div>
                {/* model  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Model</label>
                    <input
                        type="model"
                        {...register("model", {
                            required: true,
                        })}
                        className="input w-full"
                        placeholder="Model"
                        required
                    />
                </div>
                {/* price  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Price</label>
                    <input
                        type="number"
                        {...register("price", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        className="input w-full"
                        placeholder="Price"
                        required
                    />
                </div>
                {/* year  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Year</label>
                    <input
                        type="number"
                        {...register("year", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        className="input w-full"
                        placeholder="Year"
                        required
                    />
                </div>
                {/* category  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Category</label>
                    <select
                        className="select"
                        {...register("category")}
                        defaultValue="Select a Category"
                    >
                        <option disabled={true}>Select a Category</option>
                        {carCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* stock  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Stock</label>
                    <input
                        type="number"
                        {...register("stock", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        className="input w-full"
                        placeholder="Stock"
                        required
                    />
                </div>
                {/* pick file  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1 text-[16px]">Pick a file</label>
                    <UploadFile onUploadComplete={(url) => setfileURL(url)} optional={false} />

                    {/* preview image  */}
                    {/* {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Uploaded"
                                className="w-32 h-32 object-cover mt-2 rounded"
                            />
                        )} */}
                </div>
                {/* productDetails  */}
                <div className="mx-2 w-full md:col-span-2 lg:col-span-3">
                    <label className="fieldset-label mb-1">
                        Product Details
                    </label>
                    <textarea
                        {...register("productDetails", {
                            required: true,
                        })}
                        className="textarea w-full"
                        placeholder="Product Details"
                        required
                    />
                </div>

                <div className="flex justify-self-start gap-2 mx-1 mt-2">
                    <input
                        type="checkbox"
                        name="showPassword"
                        id="showPassword"
                        onChange={() => setIsFeatured(!isFeatured)}
                    />
                    <label htmlFor="showPassword texl-left">Make this Car Featured</label>
                </div>

                <button
                    className="btn btn-neutral mt-4 uppercase mx-auto md:col-span-2 lg:col-span-3"
                    type="submit"
                >
                    Add New Car
                </button>
            </form>
        </LayoutWrapper>
    );
};

export default AddProduct;
