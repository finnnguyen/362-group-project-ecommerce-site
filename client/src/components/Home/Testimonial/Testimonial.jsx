import "./Testimonial.css";
import jackblack from "../../../public/jack-black.webp";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export default function Testimonial() {
    return (
        <div className="testimonial">
            <div className="review">
                <h1>Tie-tested. Professional approved.</h1>
                <div className="rating">
                    <StarOutlinedIcon className="star"/>
                    <StarOutlinedIcon className="star"/>
                    <StarOutlinedIcon className="star"/>
                    <StarOutlinedIcon className="star"/>
                    <StarHalfOutlinedIcon className="star"/>
                </div>
                <p className="quote">"Chicken jockey."</p>
                <p className="attribution">- Jack Black</p>
            </div>
            <img src={jackblack} alt="jack black" />
        </div>
    )
}