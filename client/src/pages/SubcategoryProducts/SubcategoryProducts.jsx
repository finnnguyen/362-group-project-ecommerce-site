import { useParams, Navigate } from "react-router-dom";
import { allowedCategories, allowedSubcategories } from "../../stores/allowedCategories";

export default function SubcategoryProducts() {
    const {category, subcategory} = useParams();

    if (!allowedCategories.includes(category) || !allowedSubcategories.includes(subcategory)) {
        return <Navigate to="/notfound" />
    }
    
    return (
        <div>
            <p>Category: {category}</p>
            <p>Subcategory: {subcategory} </p>
        </div>
    )
}