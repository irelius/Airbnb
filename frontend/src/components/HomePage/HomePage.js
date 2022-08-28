import { NavLink, Route, Switch } from "react-router-dom";



function HomePage() {
    const handleLogOut = async (e) => {
        e.preventDefault();


    }

    return (
        <div>
            {/* <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink> */}
            <ul>
                <li>
                    <NavLink to="/login">Log In</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                </li>
            </ul>
            <button onClick={handleLogOut}>
                Log Out
            </button>
        </div>
    )

}

export default HomePage;
