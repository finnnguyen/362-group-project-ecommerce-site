import "./Hero.css";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import image1 from "../../../public/carousel/man-striped-tie.webp";
import image2 from "../../../public/carousel/man-smoking-red-tie.webp";
import { useEffect, useRef, useState } from "react";

export default function Hero() {

    const contentRef = useRef(null)

    const [parent, setParent] = useState(null);
    const [imgCount, setImgCount] = useState(0);
    const [selectedImg, setSelectedImg] = useState(1);

    useEffect(() => {
        setImgCount(contentRef.current.querySelectorAll(".image").length);
        setParent(contentRef.current);
    }, []);

    function next() {  
        if (!parent) return;
        setSelectedImg(prev => {
            const newImg = prev >= imgCount ? 1 : prev+1;
            parent.scrollLeft = (newImg-1) * parent.offsetWidth;
            return newImg;
        });
    }
    
    function prev() {
        if (!parent) return;
        setSelectedImg(prev => {
            console.log(prev)
            const newImg = prev <= 1 ? imgCount : prev-1;
            parent.scrollLeft = (newImg-1) * parent.offsetWidth;
            return newImg;
        });
    }

    setInterval(() => {
        next();
    }, 10000);

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
                        <img src={image1} alt="Man standing with striped black, red, and white tie" />
                    </div>

                    <div className="image">
                        <p>Photo by Enrique Bancalari on Unsplash</p>
                        <img src={image2} alt="Man with red tie sitting and smoking" />
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