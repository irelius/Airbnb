import "./EditSpotForm.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom";
import { editSpotThunk } from "../../../store/spot";

function EditSpotForm() {
    const dispatch = useDispatch();
    const spotId = useParams().spotId;
    const currentSpot = useSelector(state => state.spot[spotId])

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDesription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const edits = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        dispatch(editSpotThunk(spotId, edits))

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={currentSpot.address}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={currentSpot.city}
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={currentSpot.state}
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={currentSpot.country}
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <input
                    type="number"
                    placeholder={currentSpot.lat}
                    required
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
                <input
                    type="number"
                    placeholder={currentSpot.lng}
                    required
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={currentSpot.name}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={currentSpot.description}
                    required
                    value={description}
                    onChange={(e) => setDesription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder={currentSpot.price}
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit" className="continue-button">
                    Save Edits
                </button>
            </form>
        </div>
    )
}

export default EditSpotForm
