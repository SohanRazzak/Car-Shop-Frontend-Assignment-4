import { Link } from "react-router";

const ProductCard = () => {
    return (
        <div className="card bg-base-300 w-full shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    Car Title Goes Here
                    {/* featured badge */}
                    <div className="badge badge-secondary">Featured</div>
                </h2>
                <p>
                    {"A card component has a figure".slice(0, 10).concat("...")}
                </p>
                <div className="card-actions flex-col">
                    <p>Brand: Toyota </p>
                    <p>Model: Toyota Trx 09 </p>
                    <p>Category: Sedan</p>
                    <p>Price: 14903 </p>
                </div>
                <Link to={`/product/${"id"}`}>
                    <button className="block btn btn-accent text-white uppercase mx-auto mt-3 items-center">
                    View Specification
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
