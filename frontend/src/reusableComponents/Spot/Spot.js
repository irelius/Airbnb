import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import "./Spot.css"
import loadImage from "./HelperFunctions/loadImage"

function Spot({ spot }) {
    return (
        <NavLink exact to={`/spot-details/${spot.id}`} className="spot-container">
            <div className="spot">
                <section className="spot-image">{loadImage(spot)}</section>
                <div className="spot-description">
                    <section className="spot-name">
                        {`${spot.name}`}, {`${spot.state}`}
                    </section>
                    <section className="spot-price">
                        ${(`${spot.price}`)} night
                    </section>
                </div>
            </div>
        </NavLink>
    )
}

export default Spot
