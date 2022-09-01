import { NavLink } from "react-router-dom"

function SpotPageIntro() {
    return (
        <>
            <div className="left">
                left video
            </div>
            <div className="right">
                <button className="exit-button">
                    <NavLink exact to="/">Exit</NavLink>
                </button>
                <h1>
                    Become a Host in 10 easy steps
                </h1>
                <p>
                    Join us. We'll Help you every step of the way
                </p>
                <div className="right-footer">
                    <button className="continue-button">
                        <NavLink to="/become-a-host/property-form">Let's Go!</NavLink>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SpotPageIntro;
