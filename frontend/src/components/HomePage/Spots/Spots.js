import "./Spots.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { loadSpotsThunk } from "../../../store/spot";


function Spots() {
    const dispatch = useDispatch();
    const testSpots = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]

    useEffect(() => {
        dispatch(loadSpotsThunk());
    }, [dispatch])

    const allSpots = useSelector(state => state.spot);
    console.log(allSpots, "test")

    return (
        <div className="spots">
            <ul className="spots-unordered-list">
                {
                    testSpots.map(el => {
                        return <span className={`spot ${el}`}>
                            <li className="spot-inner-text" key={el.id}>
                                <div className="spot-image">
                                    Spot Image (wow so pretty)
                                </div>
                                <div className="spot-description">
                                    this is description for {el}
                                </div>
                            </li>
                        </span>
                    })
                }
            </ul>
        </div>
    )
}

export default Spots;
