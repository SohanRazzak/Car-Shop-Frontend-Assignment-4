import { useForm } from "react-hook-form";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import { TProduct } from "../../types/types";

const AddProduct = () => {
    const { register, handleSubmit } = useForm<TProduct>();

    const handleAddProduct = (data: TProduct) => {
        console.log(data);
    };
    return (
        <LayoutWrapper>
            <form
                onSubmit={handleSubmit(handleAddProduct)}
                className="grid grid-cols-1 gap-5"
            >
                {/* Name */}
                <div>
                    <label className="fieldset-label mb-1">Name</label>
                    <input
                        type="name"
                        {...register("name", {
                            required: true,
                        })}
                        className="input"
                        placeholder="Name"
                        required
                    />
                </div>

                {/* brand  */}
                <div>
                    <label className="fieldset-label mb-1">Brand</label>
                    <input
                        type="brand"
                        {...register("brand", {
                            required: true,
                        })}
                        className="input"
                        placeholder="Brand"
                        required
                    />
                </div>
                {/* price  */}
                <div>
                    <label className="fieldset-label mb-1">Price</label>
                    <input
                        type="price"
                        {...register("price", {
                            required: true,
                        })}
                        className="input"
                        placeholder="Price"
                        required
                    />
                </div>
                {/* model  */}
                <div>
                    <label className="fieldset-label mb-1">Model</label>
                    <input
                        type="model"
                        {...register("model", {
                            required: true,
                        })}
                        className="input"
                        placeholder="Model"
                        required
                    />
                </div>
                {/* year  */}
                <div>
                    <label className="fieldset-label mb-1">Year</label>
                    <input
                        type="year"
                        {...register("year", {
                            required: true,
                        })}
                        className="input"
                        placeholder="Year"
                        required
                    />
                </div>
                {/* category  */}
                <div>
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
