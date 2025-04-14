import { useParams, Navigate } from "react-router-dom"
import { isValidProduct } from "../../stores/allowedCategories";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
    const { category } = useParams();
    if (!isValidProduct(category)) return <Navigate to="/notfound" />;

    const [products, setProducts] = useState([]);

    useEffect(() => {

        setProducts([]);
        const fetchData = async () => {
            try {
                const data = await axios.get(import.meta.env.VITE_API_URL + `/products?filters[categories][title][$eq]=${category}&populate=*`, {
                    headers: {
                        Authorization: "bearer " + import.meta.env.VITE_API_TOKEN,
                    }
                });
                setProducts(data.data.data);
            }
            catch(err) {
                console.error(err);
            }
        };
        // fetchData();
    }, [category]);

    return (
        <div>
            <p>Category: {category}</p>
            {
                products.map(product => {
                    return (
                        <div key={product.id}>
                            <h1>{product.title}</h1>
                            <p>{product.description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}