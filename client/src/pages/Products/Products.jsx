import { useParams, Navigate } from "react-router-dom"
import { allowedCategories } from "../../stores/allowedCategories";

export default function Products() {
    const { category } = useParams();

    if (!allowedCategories.includes(category)) {
        return <Navigate to="/notfound"/>;
    }

    return (
        <div>
            <p>Category: {category}</p>
        </div>
    )
}