import { Link } from "react-router";

const HomeBanner = () => {
    return (
        <div
            className="flex items-center bg-right md:bg-cover min-h-screen"
            style={{
                backgroundImage: `url(/motorhivebanner.jpeg)`,
            }}
        >
            <div className="text-neutral-content text-left mx-auto my-4 md:mx-20">
                <div className="max-w-xl bg-[#0d0d0d89] md:rounded-xl p-8">
                    <h1 className="mb-5 text-4xl md:text-5xl font-bold md:leading-14">
                        Amazing deals on quality cars from MotorHive
                    </h1>
                    <div className="mb-5 text-xl md:text-2xl space-y-3">
                        <ul className="list-disc list-inside pl-5">
                            <li>Choose</li>
                            <li>Compare</li>
                            <li>Checkout</li>
                        </ul>
                        <p>— all from the comfort of your home.</p>
                    </div>
                    <Link to="/all-cars">
                        <button className="btn btn-accent uppercase">
                            View All Cars
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
