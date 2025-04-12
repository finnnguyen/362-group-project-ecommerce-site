import { useParams, Navigate } from "react-router-dom"
import { allowedCategories, allowedSubcategories } from "../../stores/allowedCategories"

export default function Product() {
    const {category, subcategory, id} = useParams();

    if (!allowedCategories.includes(category) || !allowedSubcategories.includes(subcategory)) {
        return <Navigate to="/notfound" />
    }

    return (
        <div>
            <p>Category: {category}</p>
            <p>Subcategory: {subcategory}</p>
            <p>Id: {id}</p>
        </div>
    )
}