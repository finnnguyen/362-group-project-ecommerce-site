import "./Hero.css";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import carouselImg1 from "../../../public/carousel/man-striped-tie.webp";
import carouselImg2 from "../../../public/carousel/man-smoking-red-tie.webp";
import { useEffect, useRef, useState } from "react";

export default function Hero() {

    const contentRef = useRef(null);

    const [imgCount, setImgCount] = useState(0);
    const [selectedImg, setSelectedImg] = useState(1);

    useEffect(() => {
        setImgCount(contentRef.current.querySelectorAll(".image").length);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 10000);

        return () => clearInterval(interval);
    }, [selectedImg, imgCount]);

    function next() {  
        if (selectedImg+1 > imgCount) {
            contentRef.current.scrollLeft = 0;
            setSelectedImg(1);
        }
        else {
            contentRef.current.scrollLeft += contentRef.current.offsetWidth;
            setSelectedImg(selectedImg+1)
        }
    }
    
    function prev() {
        if (selectedImg-1 < 1) {
            contentRef.current.scrollLeft = imgCount*contentRef.current.offsetWidth;
            setSelectedImg(imgCount);
        }
        else {
            contentRef.current.scrollLeft -= contentRef.current.offsetWidth;
            setSelectedImg(selectedImg-1);
        }
    }

    return (
        <>
        <div className="hero">
            <div className="carousel">

                <button className="prev" onClick={prev}>
                    <ChevronLeftOutlinedIcon sx={{ color: "white" }}/>
                </button>

                <button className="next" onClick={next}>
                    <ChevronRightOutlinedIcon sx={{ color: "white" }}/>
                </button>

                <div className="content" ref={contentRef}>

                    <div className="image">
                        <p>Photo by Maxim Mushnikov on Unsplash</p>
                        <img src={carouselImg1} alt="Man standing with striped black, red, and white tie" />
                    </div>

                    <div className="image">
                        <p>Photo by Enrique Bancalari on Unsplash</p>
                        <img src={carouselImg2} alt="Man with red tie sitting and smoking" />
                    </div>
                    
                </div>

            </div>
        </div>        

        {/* <div className="collar-and-tie">
            <div className="collar">
                <div className="collar-left"></div>
                <div className="collar-right"></div>
            </div>
            <div className="tie">
                <div className="tie-body"></div>
                <div className="tie-stripe"></div>
                <div className="tie-body"></div>
                <div className="tie-stripe"></div>
                <div className="tie-body"></div>
                <div className="tie-end"></div>
            </div>
        </div> */}
        </>
    )
}