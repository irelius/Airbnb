import "./Spots.css"
import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";


function Spots() {
    const testSpots = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]

    const allSpots = useSelector(state => Object.values(state.spot));
    console.log(allSpots, "reference")

    return (
        <div className="spots">
            {allSpots.map(el => {
                return (
                    <div className={`spot ${el}`}>
                        <div className="spot-image">
                            <img src={`${el.previewImg}`} alt={`Image for ${el.name}`} />
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
