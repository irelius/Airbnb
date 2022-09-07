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

    return (
        <div className="spots">
            {allSpots.map(el => {
                return (
                    <div className={`spot ${el}`}>
                        <NavLink exact to={`/spot-details/${el.id}`}>
                            <div className="spot-image">
                                <img src={`${el.previewImg}`} alt={`${el.name}`} />

                            </div>
                            <div className="spot-description">
                                {`${el.description}`}
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default Spots;
