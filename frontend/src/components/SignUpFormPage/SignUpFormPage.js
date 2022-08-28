import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signupThunk } from "../../store/session";
import { Redirect } from "react-router-dom"

function SignUpFormPage() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (currentUser) {
        return (
            <Redirect to='/' />
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            firstName,
            lastName,
            email,
            password
        }
        dispatch(signupThunk(newUser))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    )
}


export default SignUpFormPage
