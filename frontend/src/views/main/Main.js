import Header from "../../reusableComponents/Header"
import Footer from "../../reusableComponents/Footer"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { restoreUserThunk } from "../../store/session";

function Main() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreUserThunk())
    }, [dispatch])

    const user = useSelector(state => state.session.user) || -1

    return (
        <div>
            <Header props={user} />
            <Footer />
            main
        </div>
    )
}

export default Main
