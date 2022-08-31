import "./Header.css"

import Navigation from "../../Navigation";
import ProfileButton from "../../Navigation/ProfileButton";
import { restoreSessionThunk } from "../../../store/session";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"

function Header() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(restoreSessionThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);


    return (
        <div className="header">
            <div className="header-left">
                <span>
                    <button>
                        <div className="header-icon">
                            <i className="fa-brands fa-airbnb"></i>
                        </div>
                        <div>
                            <button>
                                <NavLink exact to="/">AirBnB</NavLink>
                            </button>
                        </div>
                    </button>
                </span>
            </div>
            <div className="header-center">
                <span>

                </span>
            </div>
            <div className="header-right">
                <span>
                    <button>
                        Become a Host
                    </button>
                </span>
                <span>
                    <button>
                        Globe
                    </button>
                </span>
                <span>
                    <ProfileButton />
                </span>
                <span>
                    <Navigation />
                </span>
            </div>
        </div>
    )
}

export default Header;
