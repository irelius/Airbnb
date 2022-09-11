// frontend/src/components/LoginFormModal/LoginForm.js
import "./LoginForm.css"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../store/session';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const allUsers = {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(loginThunk({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
                if (data.statusCode === 401) {
                    setErrors([data.message])
                };
            }
        );
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
    );
}

export default LoginForm;
