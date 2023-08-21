import "./Spots.css"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadSpotsThunk } from "../../../store/spot";

import loadImage from "./SpotsHelperFunctions/loadImage";

function Spots() {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false)
    useEffect(() => {
        dispatch(loadSpotsThunk())
        if (allSpots.length > 0) {
            setLoad(true)
        }
    }, [dispatch])

    const allSpots = useSelector(state => Object.values(state.spot))

    return load ? (
        <div className="all-spots-main-container">
            {allSpots.map((el, i) => {
                return (
                    <NavLink key={i} exact to={`/spot-details/${el.id}`} className="all-spots-container">
                        <div className="spot">
                            <div className="spot-image">
                                {loadImage(el)}
                            </div>
                            <div className="spot-description">
                                <div className="spot-name">
                                    {`${el.name}`}, {`${el.state}`}
                                </div>
                                <div className="spot-price">
                                    ${(`${el.price}`)} night
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    ) : (
        <div></div>
    )
}

export default Spots;
