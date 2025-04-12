import { Link } from "react-router";
import { TProduct } from "../../types/types";

type Props = {
    car: TProduct;
};
const ProductCard = ({ car }: Props) => {
    return (
        <div className="card h-full bg-base-300 w-full shadow-sm max-w-sm">
            <figure>
                <img
                    src={car?.image}
                    className="h-40 w-full"
                    onError={(e) => {
                        e.currentTarget.src = "/noImage.png";
                    }}
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {car.name}
                    {/* featured badge */}
                    {car.isFeatured && <div className="badge badge-secondary">Featured</div>}
                </h2>
                <p className="mb-2">
                    {car.productDetails.slice(0, 200).concat("...")}
                </p>
                <div className="card-actions flex-col">
                    <p>Brand: {car.brand}</p>
                    <p>Category: {car.category}</p>
                    <p>Starts From: {car.price + " Dollar"} </p>
                </div>
                <Link to={`/car/${car._id}`}>
                    <button className="block btn btn-accent text-white uppercase mx-auto mt-3 items-center">
                        View Specification
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
