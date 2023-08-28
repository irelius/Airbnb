import "./UserSpots.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { restoreUserThunk } from "../../store/session";
import { loadSpotsThunk } from "../../store/spot";
import { deleteSpotThunk } from "../../store/spot";

function UserSpots() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreUserThunk());
        dispatch(loadSpotsThunk());
    }, [dispatch]);

    const user = useSelector(state => state.session.user)
    if(user === undefined) {
        window.location.href = "/"
    }
    const allSpots = useSelector(state => Object.values(state.spot));
    const userSpots = [];
    allSpots.forEach(el => {
        if (el.ownerId === user.id) {
            userSpots.push(el)
        }
    })

    const deleteSpot = (spot) => {
        dispatch(deleteSpotThunk(spot))
        history.go(0);
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
                                <div className="listing">
                                    <div className="listing-details">
                                        <div className="listing-image">
                                            <img src={`${el.previewImg}`} alt={`${el.name}`} />
                                        </div>
                                        <div className="listing-name">
                                            {el.name}
                                        </div>
                                        <div className="listing-address">
                                            {el.city}, {el.state}, {el.country}
                                        </div>
                                    </div>
                                    <div className="edit">
                                        <button className="edit-button">
                                            <NavLink exact to={`/edit-spot/${el.id}`}>Edit Listing</NavLink>
                                        </button>
                                    </div>
                                    <div className="delete">
                                        <button onClick={() => { deleteSpot(el) }} className="delete-button">
                                            Delete Listing
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )

        }
    }


    return (
        <div className="user-spots-main">
            <div>
                <h1 className="h1">
                    Your Listings
                </h1>
            </div>
            <div className="listings">
                {showHandleHosting()}
            </div>
        </div>
    )
}

export default UserSpots
