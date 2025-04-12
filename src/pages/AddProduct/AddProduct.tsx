import { useForm } from "react-hook-form";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { TProduct } from "../../types/types";
import UploadFile from "../../components/UploadFile/UploadFile";
import { useState } from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

const AddProduct = () => {
    const { register, handleSubmit } = useForm<TProduct>();
    const [imageUrl, setImageUrl] = useState<string>("");

    const handleAddProduct = (data: TProduct) => {
        console.log({ ...data, imageUrl });
    };
    return (
        <LayoutWrapper>
            <SectionHeading title="Add New Car" subTitle=""/>
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
                {/* price  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Price</label>
                    <input
                        type="number"
                        {...register("price", {
                            required: true,
                        })}
                        className="input w-full"
                        placeholder="Price"
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
                {/* year  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Year</label>
                    <input
                        type="number"
                        {...register("year", {
                            required: true,
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
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                    </select>
                </div>

                {/* stock  */}
                <div className="mx-2 w-full">
                    <label className="fieldset-label mb-1">Stock</label>
                    <input
                        type="number"
                        {...register("stock", {
                            required: true,
                        })}
                        className="input w-full"
                        placeholder="Stock"
                        required
                    />
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

                {/* pick file  */}
                <fieldset className="fieldset">
                    <label className="fieldset-label">Pick a file</label>
                    <UploadFile onUploadComplete={(url) => setImageUrl(url)} />
                        {/* preview image  */}
                    {/* {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="w-32 h-32 object-cover mt-2 rounded"
                        />
                    )} */}
                </fieldset>

                <button
                    className="btn btn-neutral mt-4 uppercase mx-auto"
                    type="submit"
                >
                    Add New Car
                </button>
            </form>
        </LayoutWrapper>
    );
};

export default AddProduct;
