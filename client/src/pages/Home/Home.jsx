import "./Home.css"
import Hero from "../../components/Home/Hero/Hero";
import Trending from "../../components/Home/Trending/Trending";
import CallToAction from "../../components/Home/CallToAction/CallToAction";
import Testimonial from "../../components/Home/Testimonial/Testimonial";

import jackBlackImg from "../../public/jack-black.webp";
import callToActionImg from "../../public/man-fixing-blazer.webp";
import carouselImg1 from "../../public/carousel/man-striped-tie.webp";
import carouselImg2 from "../../public/carousel/man-smoking-red-tie.webp";

import { useEffect } from "react";

export default function Home() {

    const imgArr = [jackBlackImg, callToActionImg, carouselImg1, carouselImg2];

    useEffect(() => {
        imgArr.forEach(img => {
            const preload = new Image();
            preload.src = img;
        })
    }, []);

    return (
        <div className="homepage">
            <Hero/>
            <CallToAction/>    
            <Testimonial/>
            <Trending />
        </div>
    )
}