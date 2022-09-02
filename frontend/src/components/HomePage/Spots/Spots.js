import "./Spots.css"
import { useSelector } from "react-redux";

function Spots() {
    const allSpots = useSelector(state => Object.values(state.spot));

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
