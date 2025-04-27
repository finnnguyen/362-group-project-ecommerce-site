import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth";

export default function Profile() {
    const sessionId = Cookies.get("sessionId");
    const navigate = useNavigate();
    const { user, loading, error, authUser } = useAuth();
    const [localUser, setLocalUser] = useState(null);

    useEffect(() => {
        if (!sessionId) {
            navigate("/login");
            return;
        }

        const loadUserData = async () => {
            try {
                // Check localStorage first
                const cachedUser = JSON.parse(localStorage.getItem("data"));
                if (cachedUser) {
                    setLocalUser(cachedUser);
                    return;
                }

                // Fetch fresh data if not in cache
                const freshUser = await authUser(sessionId);
                localStorage.setItem("data", JSON.stringify(freshUser));
            } catch (err) {
                console.error("Failed to load user data:", err);
                handleLogOut();
            }
        };

        loadUserData();
    }, [sessionId, navigate, authUser]);

    function handleLogOut() {
        Cookies.remove("sessionId");
        localStorage.removeItem("data");
        navigate("/login");
    }

    // Determine which user data to display
    const displayUser = localUser || user;

    if (loading && !displayUser) return <div className="loading">Loading profile...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!displayUser) return <div className="error">No user data found</div>;

    return (
        <div className="profile-container">
            <div className="greeting">
                <h1>Hello, {displayUser?.username || displayUser?.email}</h1>
            </div>
            <div className="profile-links">
                <button onClick={handleLogOut} className="logout-btn">
                    Log out
                </button>
                {displayUser?.role?.type === 'authenticated' && (
                    <button 
                        onClick={() => navigate("/admin")} 
                        className="admin-btn"
                    >
                        Admin Dashboard
                    </button>
                )}
            </div>
        </div>
    );
}