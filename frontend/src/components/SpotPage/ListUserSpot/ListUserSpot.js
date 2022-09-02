import { useSelector } from "react-redux"
import "./ListUserSpot.css"


function ListUserSpot() {
    // const userId = useSelector(state => state.session.user.id)
    const allSpots = useSelector(state => state.spot);
    const user = useSelector(state => state.session.user)
    console.log(user, "testtest");
    const userSpots = [];
    allSpots.forEach(el => {
        if(el.ownerId === user.id) {
            userSpots.push(el)
        }
    })
    console.log(userSpots);

    const handleChecking = () => {
        return (
            <>
                <div>icon</div>
                <div>
                    <p>
                        You don't have any guests checking out today or tomorrow.
                    </p>
                </div>
            </>
        )
    }
    const handleHosting = () => {

    }
    const handleArriving = () => {
        return (
            <>
                <div>icon</div>
                <div>
                    <p>
                        You don't have any guests arriving today or tomorrow.
                    </p>
                </div>
            </>
        )
    }
    const handleUpcoming = () => {
        return (
            <>
                <div>icon</div>
                <div>
                    <p>
                        You currently don't have any upcoming guests.
                    </p>
                </div>
            </>
        )
    }
    const handlePending = () => {
        return (
            <>
                <div>icon</div>
                <div>
                    <p>
                        You don't have any guest reviews to write.
                    </p>
                </div>
            </>
        )
    }


    return (
        <>
            <div>
                header
            </div>
            <div>
                Your Listings
                <div className="tab-list">
                    <button onClick={handleChecking}>Checking Out</button>
                    <button onClick={handleHosting}>Currently Hosting</button>
                    <button onClick={handleArriving}>Arriving Soon</button>
                    <button onClick={handleUpcoming}>Upcoming</button>
                    <button onClick={handlePending}>Pending Review</button>
                </div>
            </div>
        </>
    )
}

export default ListUserSpot;
