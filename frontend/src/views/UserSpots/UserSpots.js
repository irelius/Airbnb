import "./UserSpots.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { NavLink, useHistory } from "react-router-dom";
import { restoreUserThunk } from "../../store/session";
import { loadSpotsThunk } from "../../store/spot";
import { deleteSpotThunk } from "../../store/spot";

function UserSpots() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreUserThunk());
        dispatch(loadSpotsThunk());
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
        if (userSpots.length === 0) {
            return (
                <div>
                    <p>You don't have any locations to host.</p>
                </div>
            )
        } else {
            return (
                <div id="all-spots">
                    {
                        userSpots.map(el => {
                            return (
                                <div id="listing">
                                    <div id="listing-details">
                                        <img src={`${el.previewImg}`} alt={`${el.name}`} id="listing-image" />
                                        <div id="listing-name">
                                            {el.name}
                                        </div>
                                        <div id="listing-address">
                                            {el.city}, {el.state}, {el.country}
                                        </div>
                                    </div>
                                    <div id="edit">
                                        <button id="edit-button">
                                            <NavLink exact to={`/edit-spot/${el.id}`}>Edit Listing</NavLink>
                                        </button>
                                    </div>
                                    <div id="delete">
                                        <button onClick={() => { deleteSpot(el) }} id="delete-button" className="bold">
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
        <div id="user-spots-main">
            <div>
                <h1 id="h1">
                    Your Listings
                </h1>
            </div>
            <div id="listings">
                {showHandleHosting()}
            </div>
        </div>
    )
}

export default UserSpots
