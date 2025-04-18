import LayoutWrapper from "../../layouts/LayoutWrapper";
import SectionHeading from "../SectionHeading/SectionHeading";
import testimonials from "./testimonies";

const Testimonials = () => {
    return (
        <LayoutWrapper>
            <section className="py-8 px-4 max-w-6xl mx-4 flex justify-center place-self-center bg-gray-50 rounded-xl my-6 md:my-12">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        title="Customer Testimonials"
                        subTitle="Hear what our customers say about us"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-lg ${
                                                i < testimonial.rating
                                                    ? "text-yellow-500"
                                                    : "text-gray-300"
                                            }`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                <p className="text-gray-700">
                                    "{testimonial.content}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </LayoutWrapper>
    );
};

export default Testimonials;
