import LayoutWrapper from "../../layouts/LayoutWrapper";
import SectionHeading from "../SectionHeading/SectionHeading";

const WhyUs = () => {
    return (
        <LayoutWrapper>
            <section className="my-10 bg-base-100">
                <div className="max-w-6xl mx-auto px-4">
                    <SectionHeading title="Why Choose MotorHive?" subTitle="Customers From Near and Far Choosing Us"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="card bg-base-200 shadow-md p-6">
                            <figure className="text-accent">
                                <svg
                                    className="w-12 h-12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 10h4l3 8h8l3-6H9" />
                                </svg>
                            </figure>
                            <h3 className="text-xl font-semibold mt-4">
                                Wide Selection
                            </h3>
                            <p className="text-sm mt-2">
                                Explore a diverse range of cars from top brands
                                and models in one place.
                            </p>
                        </div>

                        <div className="card bg-base-200 shadow-md p-6">
                            <figure className="text-accent">
                                <svg
                                    className="w-12 h-12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 12l2 2 4-4" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            </figure>
                            <h3 className="text-xl font-semibold mt-4">
                                Trusted Quality
                            </h3>
                            <p className="text-sm mt-2">
                                Each vehicle goes through quality checks so you
                                can drive worry-free.
                            </p>
                        </div>

                        <div className="card bg-base-200 shadow-md p-6">
                            <figure className="text-accent">
                                <svg
                                    className="w-12 h-12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 9V7a4 4 0 0 0-8 0v2M5 12h14" />
                                    <path d="M12 15v2" />
                                </svg>
                            </figure>
                            <h3 className="text-xl font-semibold mt-4">
                                Secure Payments
                            </h3>
                            <p className="text-sm mt-2">
                                Pay confidently with our integrated SurjoPay
                                gateway.
                            </p>
                        </div>

                        <div className="card bg-base-200 shadow-md p-6">
                            <figure className="text-accent">
                                <svg
                                    className="w-12 h-12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" />
                                    <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" />
                                </svg>
                            </figure>
                            <h3 className="text-xl font-semibold mt-4">
                                Customer Support
                            </h3>
                            <p className="text-sm mt-2">
                                Friendly support team available to help you
                                every step of the way.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutWrapper>
    );
};

export default WhyUs;
