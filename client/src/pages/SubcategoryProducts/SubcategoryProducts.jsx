import { useParams, Navigate } from "react-router-dom";
import { isValidProduct } from "../../stores/allowedCategories";

export default function SubcategoryProducts() {
    const {category, subcategory} = useParams();
    if (!isValidProduct(category, subcategory)) return <Navigate to="/notfound" />;
    
    return (
        <div>
            <p>Category: {category}</p>
            <p>Subcategory: {subcategory} </p>
        </div>
    )
}