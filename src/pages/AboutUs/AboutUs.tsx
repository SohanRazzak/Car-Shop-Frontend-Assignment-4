import WhyUs from "../../components/WhyUs/WhyUs";

const AboutUs = () => {
    return (
        <div className="bg-base-100">
            <header className="bg-accent text-accent-content text-center py-12">
                <h1 className="text-3xl lg:text-4xl font-bold">
                    About Us - MotorHive
                </h1>
            </header>

            <section className="text-center py-12 px-4">
                <h2 className="text-2xl font-bold">Mission & Values</h2>
                <p className="mt-4 text-base-content max-w-2xl mx-auto">
                    At MotorHive, we aim to bring the best vehicles and
                    automotive services to your fingertips — making car buying
                    smooth, secure, and satisfying.
                </p>
                <div className="flex justify-center space-x-8 mt-8 animate-fadeIn">
                    <div className="transition-transform hover:scale-110">
                        <h3 className="text-xl font-bold">500+</h3>
                        <p className="text-base-content">Happy Car Owners</p>
                    </div>
                    <div className="transition-transform hover:scale-110">
                        <h3 className="text-xl font-bold">15+</h3>
                        <p className="text-base-content">Brands Available</p>
                    </div>
                </div>
            </section>

            <section className="bg-teal-600 text-primary-content py-12 px-4">
                <h2 className="text-2xl font-bold text-center">Our Vision</h2>
                <p className="mt-4 text-center max-w-2xl mx-auto">
                    To be the most trusted platform for discovering, comparing,
                    and owning cars — with complete transparency and expert
                    support.
                </p>
            </section>

            <section className="text-center py-12 px-4">
                <h2 className="text-2xl font-bold">Our Car Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                    {["Sedans", "SUVs", "Hatchbacks", "Many more.."].map(
                        (type) => (
                            <div
                                key={type}
                                className="p-4 shadow-lg rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                            >
                                <h3 className="text-xl font-bold">{type}</h3>
                            </div>
                        )
                    )}
                </div>
            </section>

            <WhyUs/>
        </div>
    );
};

export default AboutUs;