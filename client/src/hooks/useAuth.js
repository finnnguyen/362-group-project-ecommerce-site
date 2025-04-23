import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

export const useAuth = (sessionId) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setUser(null);

        setLoading(true);
        makeRequest.get("/users/me?populate=*", {
            headers: {
                Authorization: `Bearer ${sessionId}`, 
            }
        })
        .then(data => {
            setUser(data.data);
            setLoading(false);
        })
        .catch(err => setError(err));
    }, [sessionId]);

    return { user, loading, error };
}