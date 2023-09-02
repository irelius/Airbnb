import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import "./Spot.css"
import loadImage from "./HelperFunctions/loadImage"

function Spot({ spot }) {
    return (
        <NavLink exact to={`/spot-details/${spot.id}`} id="spot-container">
            <section id="spot-image-container">{loadImage(spot)}</section>
            <div id="spot-description">
                <section id="spot-name" className="bold">
                    {`${spot.name}`}, {`${spot.state}`}
                </section>
                <section id="spot-price">
                    ${(`${spot.price}`)} night
                </section>
            </div>
        </NavLink>
    )
}

export default Spot
