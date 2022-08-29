import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../store/session";


function HomePage() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const handleLogOut = async (e) => {
        e.preventDefault();
        dispatch(logoutThunk(sessionUser));
    }

    const testClicker = (e) => {
        e.preventDefault();

        console.log(sessionUser);
    }

    return (
        <div>
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
            <button onClick={testClicker}>
                test
            </button>
        </div>
    )

}

export default HomePage;
