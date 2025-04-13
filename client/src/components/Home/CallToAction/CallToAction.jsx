import { Link } from "react-router-dom";
import "./CallToAction.css";
import { useEffect, useState } from "react";
import callToActionImg from "../../../public/man-fixing-blazer.webp";

export default function CallToAction() {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = callToActionImg;
        img.onload = () => setLoaded(true);
    }, [])

    return (
        <div className={`call-to-action ${loaded ? "loaded" : ""}`}>
            <div className="content">
                <h1 className="description">Designed to elevate your look with confidence and character.</h1>
                <Link to="about" className="link">Learn More</Link>
                <p>Photo by Ashley Smith on Unsplash</p>
            </div>
        </div> 
    )
}