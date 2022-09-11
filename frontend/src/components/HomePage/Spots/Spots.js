import "./Spots.css"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { loadSpotsThunk } from "../../../store/spot";


function Spots() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSpotsThunk())
    }, [dispatch])

    const allSpots = useSelector(state => Object.values(state.spot))
    console.log(allSpots, "allSpots")

    const loadImage = (el) => {
        if (el.previewImg) {
            return (
                <img src={`${el.previewImg}`} alt={`${el.name}`} />
                )
        } else {
            return (
                <div>
                    booba
                </div>
            )
        }
    }

    return (
        <div className="all-spots">
            {allSpots.map(el => {
                return (
                    <NavLink exact to={`/spot-details/${el.id}`} className="navlink">
                        <div className="spot">
                            <div className="spot-image">
                                {loadImage(el)}
                            </div>
                            <div className="spot-description">
                                <div className="spot-name">
                                    {`${el.name}`}, {`${el.state}`}
                                </div>
                                <div className="spot-price">
                                    ${`${el.price}`} night
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </NavLink>

                )
            })}
        </div>
    )
}

export default Spots;
