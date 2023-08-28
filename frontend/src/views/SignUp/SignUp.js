import "./SignUp.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signupThunk } from "../../store/session";
import { Redirect } from "react-router-dom"

function SignUp() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        return (
            <Redirect to='/' />
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            firstName,
            lastName,
            userName,
            email,
            password
        }

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(signupThunk(newUser))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                    if (data.statusCode === 403) {
                        setErrors([data.message])
                    };
                });
        } else {
            return setErrors(['Confirm Password field must be the same as the Password field']);
        }

    }

    return (
        <div className="signup-main">
            <form onSubmit={handleSubmit} className="signup-form">
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp
