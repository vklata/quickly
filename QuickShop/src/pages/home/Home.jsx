
import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
// import Category from "../../components/category/Category";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { useAuth } from "../../context/auth";




const Home = () => {
    const [auth,setAuth]=useAuth();
    return (
      
        <Layout>
              {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
            <HeroSection/>
            {/* <Category/> */}
            <HomePageProductCard/>
            <Track/>
            <Testimonial/>
        </Layout>
    );
}

export default Home;
