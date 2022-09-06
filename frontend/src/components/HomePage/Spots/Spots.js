import "./Spots.css"
import { useDispatch, useSelector } from "react-redux";
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
                        <div className="spot-image">
                            <img src={`${el.previewImg}`} alt={`${el.name}`} />
                        </div>
                        <div className="spot-description">
                            {`${el.description}`}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Spots;
