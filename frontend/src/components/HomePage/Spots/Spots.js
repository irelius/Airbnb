import "./Spots.css"

function Spots() {
    const testSpots = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]

    return (
        <div className="spots">
            <ul className="spots-unordered-list">
                {
                    testSpots.map(el => {
                        return <span className={`spot ${el}`}>
                            <li className="spot-inner-text">
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
