import "./Main.css"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadSpotsThunk } from "../../store/spot";
import Spot from "../../reusableComponents/Spot/Spot";

function Main() {
    const dispatch = useDispatch();

    const [load, setLoad] = useState(false)

    useEffect(() => {
        dispatch(loadSpotsThunk())
        setLoad(true)
    }, [dispatch])

    const spots = useSelector(state => Object.values(state.spot))

    return load ? (
        <div id="all-spots">
            {spots.map((el, i) => {
                return (
                    <Spot key={i} spot={el}/>
                )
            })}
        </div>
    ) : (
        <div></div>
    )
}

export default Main
