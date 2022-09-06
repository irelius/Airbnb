import "./Header.css"
import ProfileButton from "../../Navigation/ProfileButton";
// import Navigation from "../../Navigation";
// import { restoreSessionThunk } from "../../../store/session";
// import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"

function Header() {
    const currentUser = useSelector(state => state.session);
    let location;
    let hostingText;

    if (!currentUser.user) {
        location = "/login"
        hostingText = "Become a host"
    } else {
        location = "/become-a-host/intro"
        hostingText = "Switch to hosting"
    }

    return (
        <div className="header">
            <div className="header-left">
                <div>
                    <button className="airbnb-icon">
                        <i className="fa-brands fa-airbnb fa-3x"></i>
                        <NavLink exact to="/" className="icon-text">airbnb</NavLink>
                    </button>
                </div>
            </div>
            <div className="header-center">
                <div>

                </div>
            </div>
            <div className="header-right">
                <div>
                    <button>
                        <NavLink exact to={`${location}`}>{`${hostingText}`}</NavLink>
                    </button>
                </div>
                <div>
                    <button>
                        Globe
                    </button>
                </div>
                <div>
                    <ProfileButton />
                </div>
            </div>
        </div>
    )
}

export default Header;
