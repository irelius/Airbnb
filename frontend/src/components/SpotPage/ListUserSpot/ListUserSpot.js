import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { restoreSessionThunk } from "../../../store/session";
import "./ListUserSpot.css"

import { deleteSpotThunk } from "../../../store/spot";


function ListUserSpot() {
    const [showListing, setShowListing] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreSessionThunk());
    }, [dispatch]);

    const user = useSelector(state => state.session.user)
    const allSpots = useSelector(state => Object.values(state.spot));
    const userSpots = [];
    allSpots.forEach(el => {
        if (el.ownerId === user.id) {
            userSpots.push(el)
        }
    })

    const deleteSpot = (spot) => {
        dispatch(deleteSpotThunk(spot))

    }

    const showHandleHosting = () => {
        console.log(showListing)
        if (showListing) {
            return (
                <div className="all-spots">
                    {
                        userSpots.map(el => {
                            return (
                                <>
                                    <div className="listing">
                                        <div>
                                            {el.previewImg}
                                        </div>
                                        <div>
                                            {el.name}
                                        </div>
                                    </div>
                                    <div className="edit">
                                        <button>
                                            <NavLink exact to={`/edit-spot/${el.id}`}>Edit Listing</NavLink>
                                        </button>
                                    </div>
                                    <div className="delete">
                                        <button onClick={() => { deleteSpot(el) }}>Delete Listing</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            )
        }
    }

    // const handleChecking = () => {
    //     return (
    //         <>
    //             <div>icon</div>
    //             <div>
    //                 <p>
    //                     You don't have any guests checking out today or tomorrow.
    //                 </p>
    //             </div>
    //         </>
    //     )
    // }
    // const handleArriving = () => {
    //     return (
    //         <>
    //             <div>icon</div>
    //             <div>
    //                 <p>
    //                     You don't have any guests arriving today or tomorrow.
    //                 </p>
    //             </div>
    //         </>
    //     )
    // }
    // const handleUpcoming = () => {
    //     return (
    //         <>
    //             <div>icon</div>
    //             <div>
    //                 <p>
    //                     You currently don't have any upcoming guests.
    //                 </p>
    //             </div>
    //         </>
    //     )
    // }
    // const handlePending = () => {
    //     return (
    //         <>
    //             <div>icon</div>
    //             <div>
    //                 <p>
    //                     You don't have any guest reviews to write.
    //                 </p>
    //             </div>
    //         </>
    //     )
    // }


    return (
        <>
            <div>
                <NavLink exact to="/">header</NavLink>
            </div>
            <div>
                Your Listings
                <div className="tab-list">
                    {/* <button onClick={handleChecking}>Checking Out</button> */}
                    <button onClick={() => setShowListing(!showListing)}>Currently Hosting</button>
                    {showHandleHosting()}
                    {/* <button onClick={handleArriving}>Arriving Soon</button>
                    <button onClick={handleUpcoming}>Upcoming</button>
                    <button onClick={handlePending}>Pending Review</button> */}
                </div>
            </div>
        </>
    )
}

export default ListUserSpot;
