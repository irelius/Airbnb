import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import "./Spot.css"
import loadImage from "./HelperFunctions/loadImage"

function Spot({ spot }) {
    return (
        <NavLink exact to={`/test/${spot.id}`} className="single-spot">
            <div>
                <section className="single-spot-image">{loadImage(spot)}</section>
                <div className="single-spot-description">
                    <section className="single-spot-name">
                        {`${spot.name}`}, {`${spot.state}`}
                    </section>
                    <section className="single-spot-price">
                        ${(`${spot.price}`)} night
                    </section>
                </div>
            </div>
        </NavLink>
    )
}

export default Spot
