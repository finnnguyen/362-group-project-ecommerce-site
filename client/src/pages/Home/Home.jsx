import "./Home.css"
import Hero from "../../components/Home/Hero/Hero";
import Trending from "../../components/Home/Trending/Trending";
import CallToAction from "../../components/Home/CallToAction/CallToAction";
import Testimonial from "../../components/Home/Testimonial/Testimonial";

export default function Home() {

    return (
        <div className="homepage">
            <Hero/>
            <Trending/>  
            <CallToAction/>    
            <Testimonial/>
        </div>
    )
}