import "./SpotPageForm.css"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addSpotThunk } from "../../../store/spot";

function SpotPageForm() {
    const dispatch = useDispatch();

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

        const newSpot = {
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

        dispatch(addSpotThunk(newSpot))
    }

    return (
        <>
            <div className="left">
                <button className="home-button">
                    <NavLink exact to="/">Home</NavLink>
                </button>
                <h1>
                    What kind of place will you host?
                </h1>
            </div>

            <div className="right">
                <div className="right-header">
                    <button>
                        Ask a Superhost
                    </button>
                    <button>
                        Help
                    </button>
                    <button>
                        Save and exit
                    </button>
                </div>

                <div className="right-footer">
                    <button className="back-button">
                        <NavLink exact to="/become-a-host/intro">Back</NavLink>
                    </button>
                    <form onSubmit={handleSubmit}>
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
                            onChange={(e) => setDesription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <button type="submit" className="continue-button">
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SpotPageForm;
