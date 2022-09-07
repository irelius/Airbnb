import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { restoreUserThunk } from "../../../store/session";
import "./ListUserSpot.css"

import { deleteSpotThunk } from "../../../store/spot";


function ListUserSpot() {
    const [showListing, setShowListing] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreUserThunk());
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
        if (showListing) {
            if (userSpots.length === 0) {
                return (
                    <div>
                        <p>You don't have any locations to host.</p>
                    </div>
                )
            } else {
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
    }


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
