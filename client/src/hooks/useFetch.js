import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

export const useFetch = (url) => {

    console.log(url);
    console.log(import.meta.env.VITE_API_URL);

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setProducts([]);

        setLoading(true);
        makeRequest.get(url)
        .then(data => {
            setProducts(data.data.data);
            setLoading(false);
        })
        .catch(err => setError(err));
    }, [url]);

    return { products, loading, error };
}