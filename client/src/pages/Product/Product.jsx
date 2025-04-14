import { useParams, Navigate } from "react-router-dom"
import { isValidProduct } from "../../stores/allowedCategories"
import { useEffect } from "react";

export default function Product() {
    const {category, subcategory, id} = useParams();
    if (!isValidProduct(category, subcategory)) return <Navigate to="/notfound" />;

    return (
        <div>
            <p>Category: {category}</p>
            <p>Subcategory: {subcategory}</p>
            <p>Id: {id}</p>
        </div>
    )
}