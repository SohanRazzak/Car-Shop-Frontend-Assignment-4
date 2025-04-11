import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import WhyUs from "../../components/WhyUs/WhyUs";

const Homepage = () => {
  return (
    <div>
    <HomeBanner/>
    <FeaturedProduct/>
    <WhyUs/>
    </div>

  );
};

export default Homepage;