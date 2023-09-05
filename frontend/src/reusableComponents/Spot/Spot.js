import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import "./Spot.css"
import loadImage from "./HelperFunctions/loadImage"

function Spot({ el }) {
    return (
        <NavLink exact to={`/spot-details/${el.id}`} id="spot-container">
            <section id="spot-image-container">{loadImage(el)}</section>
            <div id="spot-description">
                <section id="spot-name" className="bold">
                    {`${el.name}`}, {`${el.state}`}
                </section>
                <section id="spot-price">
                    ${(`${el.price}`)} night
                </section>
            </div>
        </NavLink>
    )
}

export default Spot
