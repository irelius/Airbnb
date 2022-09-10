import "./SpotPageForm.css"
import { NavLink, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSpotThunk } from "../../../store/spot";
import Maps from "../../Maps/Maps";


function SpotPageForm() {
    const dispatch = useDispatch();

    const history = useHistory();
    const currentUser = useSelector(state => state.session.user)
    console.log(currentUser);

    if (!currentUser) {
        history.push('/')
    }

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            image
        }
        dispatch(addSpotThunk(newSpot))
        history.push("/")
    }

    const uploadImage = (e) => {
        const file = e.target.files[0];
        if(file) setImage(file);
        // setImage(URL.createObjectURL(file))
    }

    return (
        <div className="create-spot-main">

            <div className="left">
                <h1 className="left-header">
                    What kind of place will you host?
                </h1>
            </div>

            <div className="right">
                <div className="back-button-div">
                    <NavLink exact to="/">
                        <div className="back-button" >
                            Exit
                        </div>
                    </NavLink>
                </div>
                <div className="right-section">

                    <form onSubmit={handleSubmit} className="create-spot-form">
                        <input
                            type="text"
                            placeholder="Address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="State"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Latitude"
                            required
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Longitude"
                            required
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Location Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            type="file" accept="image/*"
                            placeholder="Upload Photos"
                            required
                            // value={image}
                            onChange={uploadImage}
                        />
                        <div className="submit-button-div">
                            <button type="submit" className="submit-button">
                                Host Your Spot
                            </button>
                        </div>
                        {/* <div className="map-container">
                            <Maps />
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SpotPageForm;
