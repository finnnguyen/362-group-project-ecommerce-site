import { Link } from "react-router-dom";
import "./CallToAction.css";

export default function CallToAction() {
    return (
        <div className="call-to-action">
            <div className="content">
                <h1 className="description">Designed to elevate your look with confidence and character.</h1>
                <Link to="about" className="link">Learn More</Link>
                <p>Photo by Ashley Smith on Unsplash</p>
            </div>
        </div> 
    )
}