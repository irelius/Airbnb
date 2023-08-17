import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { restoreUserThunk } from "../../store/session";
import { loadSpotsThunk } from "../../store/spot";
import Spot from "../../reusableComponents/Spot/Spot";


function Main() {
    const dispatch = useDispatch();

    const [load, setLoad] = useState(false)

    useEffect(() => {
        dispatch(restoreUserThunk())
        dispatch(loadSpotsThunk())

        setLoad(true)
    }, [dispatch])

    const user = useSelector(state => state.session.user) || -1
    const spots = useSelector(state => Object.values(state.spot))

    // console.log('booba', spots)

    return load ? (
        <div className="all-spots">
            {spots.map((el, i) => {
                return (
                    <Spot spot={el}/>
                )
            })}
        </div>
    ) : (
        <div></div>
    )
}

export default Main
