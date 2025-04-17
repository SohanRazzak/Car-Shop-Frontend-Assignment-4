import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import Testimonials from "../../components/Testimonials/Testimonials";
import WhyUs from "../../components/WhyUs/WhyUs";

const Homepage = () => {
  return (
    <div>
    <HomeBanner/>
    <FeaturedProduct/>
    <WhyUs/>
    <Testimonials/>
    </div>

  );
};

export default Homepage;