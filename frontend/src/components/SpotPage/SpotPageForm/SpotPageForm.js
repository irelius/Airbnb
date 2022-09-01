import { NavLink } from "react-router-dom"
import "./SpotPageForm.css"

function SpotPageForm() {
    return (
        <>
            <div className="left">
                <button className="home-button">
                    <NavLink exact to="/">Home</NavLink>
                </button>
                <h1>
                    What kind of place will you host?
                </h1>
            </div>

            <div className="right">
                <div className="right-header">
                    <button>
                        Ask a Superhost
                    </button>
                    <button>
                        Help
                    </button>
                    <button>
                        Save and exit
                    </button>
                </div>

                <div className="right-footer">
                    <button className="back-button">
                        <NavLink exact to="/become-a-host/intro">Back</NavLink>
                    </button>
                    <form>
                    </form>
                    <ul>
                        <li>
                            address
                        </li>
                        <li>
                            city
                        </li>
                        <li>
                            state
                        </li>
                        <li>
                            country
                        </li>
                        <li>
                            lat
                        </li>
                        <li>
                            lng
                        </li>
                        <li>
                            name
                        </li>
                        <li>
                            description
                        </li>
                        <li>
                            price
                        </li>
                    </ul>

                    <button className="continue-button">
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default SpotPageForm;
