import { Link } from "react-router";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
    useDeleteProductMutation,
    useGetAllProductsQuery,
} from "../../redux/features/products/productApi";
import { TProduct } from "../../types/types";
import Swal from "sweetalert2";
import { setProducts } from "../../redux/features/products/productSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import LayoutWrapper from "../../layouts/LayoutWrapper";

const ManageProducts = () => {
    const { data, isLoading, isError, error, refetch } =
        useGetAllProductsQuery(undefined);
    const [deleteProduct] = useDeleteProductMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(setProducts(data?.data as TProduct[]));
        }
    }, [data, dispatch]);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await deleteProduct(id).unwrap();
                // toast.success("Car deleted successfully!");
                Swal.fire("Deleted!", "The car has been deleted.", "success");
            } catch (err) {
                // toast.error("Failed to delete car.");
                Swal.fire(
                    "Error!",
                    "Something went wrong while deleting.",
                    "error"
                );
                console.log(err);
            }
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError || error) {
        return <ErrorComponent refetch={refetch} />;
    }

    const allCars = data.data as TProduct[];

    return (
        <LayoutWrapper>
            <SectionHeading title="Manage Products" subTitle="" />
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Category</th>
                            <th>Price ($)</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allCars?.map((product: TProduct, index: number) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-12 h-12 rounded"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.model}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <Link
                                            to={
                                                "/admin/dashboard/update-car/" +
                                                product._id
                                            }
                                        >
                                            <button className="btn btn-sm btn-outline btn-warning uppercase hover:text-white">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline btn-error uppercase hover:text-white"
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {allCars.length === 0 && (
                <div className="text-center py-10">
                    <div className="text-5xl mb-4">🚗</div>
                    <h3 className="text-xl font-semibold">No Car found</h3>
                    <p className="text-gray-500">
                        When adds new Car, they'll appear here.
                    </p>
                </div>
            )}
        </LayoutWrapper>
    );
};

export default ManageProducts;
