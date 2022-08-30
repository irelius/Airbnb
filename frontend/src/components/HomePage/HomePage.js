// import { useDispatch, useSelector } from "react-redux";
// import { logoutThunk } from "../../store/session";
import "./HomePage.css"

function HomePage() {
    // const sessionUser = useSelector(state => state.session.user)
    // const dispatch = useDispatch();

    const testSpots = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]

    return (
        <>
            <div className="header">
                <span className="airbnb-logo">
                    airbnb logo
                </span>
                <span className="time-selection">
                    time selection
                </span>
                <span className="login-information">
                    login information
                </span>
            </div>
            <div className="categories-bar">
                <span className="categories">
                    categories
                </span>
                <span className="filter-button">
                    filters button
                </span>
            </div>
            <div className="spots">
                <ul className="spots-unordered-list">
                    {
                        testSpots.map(el => {
                            return <span className={`spot ${el}`}>
                                <li className="spot-inner-text">
                                    <div className="spot-image">
                                        Spot Image (wow so pretty)
                                    </div>
                                    <div className="spot-description">
                                        this is a test spot for {el}
                                    </div>
                                </li>
                            </span>
                        })
                    }
                </ul>
            </div>
            <div className="footer">
                <span>
                    left section
                </span>
                <span>
                    right section
                </span>
            </div>
        </>
    )

}

export default HomePage;
