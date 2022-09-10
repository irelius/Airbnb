import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { restoreUserThunk } from "../../../store/session";
import { loadSpotsThunk } from "../../../store/spot";

import { deleteSpotThunk } from "../../../store/spot";

import "./UserSpots.css"

function UserSpots() {
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

        dispatch(loadSpotsThunk());
    }



    const showHandleHosting = () => {
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


    return (
        <div className="user-spots-main">
            <h1 className="h1">
                Your Listings
            </h1>
            <div className="listings">
                {showHandleHosting()}
            </div>
        </div>
    )
}

export default UserSpots;
