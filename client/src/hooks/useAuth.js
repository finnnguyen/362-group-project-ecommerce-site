import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

const useAuth = () => {
    const [authState, setAuthState] = useState({
        user: null,
        loading: false,
        error: null
    });

    const authUser = async (sessionId) => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));
        
        try {
            const response = await makeRequest.get("/users/me?populate=*", {
                headers: {
                    Authorization: `Bearer ${sessionId}`,
                }
            });
            setAuthState({
                user: response.data,
                loading: false,
                error: null
            });
            return response.data;
        } catch (err) {
            setAuthState({
                user: null,
                loading: false,
                error: err.message || "Authentication failed"
            });
            throw err;
        }
    };

    return { ...authState, authUser };
};

export default useAuth;