import "./Header.css"
import ProfileButton from "../../Navigation/ProfileButton";
// import Navigation from "../../Navigation";
// import { restoreSessionThunk } from "../../../store/session";
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"

function Header() {
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
                        <NavLink exact to="/become-a-host/intro">Become a Host</NavLink>
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
            </div>
        </div>
    )
}

export default Header;
