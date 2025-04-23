import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../makeRequest";

export default function Login() {

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const user = e.target.username.value;
        const pass = e.target.password.value;

        makeRequest.post(`/auth/local`, {
            identifier: user,
            password: pass,
        })
        .then(response => {
            Cookies.set("sessionId", response.data.jwt, { expires: 7 });
            navigate("/profile");
        })
        .catch(error => {
            if (error.response?.status == 400) {
                console.log('invalid credentials');
            }
        });
    }

    return (
        <div>
            <form className="login-form" action="/profile" method="POST" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />

                <input type="submit" />
            </form>
        </div>
    )
}