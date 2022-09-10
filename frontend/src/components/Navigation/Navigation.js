// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const url = window.location.pathname
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className="header-right">
                <div className="host-button">
                    <NavLink exact to="/become-a-host/property-form">Become a host</NavLink>
                </div>
                <div className="profile-button">

                    <ProfileButton user={sessionUser} />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div className="session-section">
                <LoginFormModal />
                <button>
                    <NavLink to="/signup">Sign Up</NavLink>
                </button>
            </div>
        );
    }

    // const categoriesBar = () => {
    //     if (url !== "/") {
    //     } else {
    //         return (
    //             <div className="categories-bar">
    //                 <span className="categories">
    //                     categories
    //                 </span>
    //                 <span className="filter-button">
    //                     filters button
    //                 </span>
    //             </div>
    //         )
    //     }
    // }

    return (
        <div className="main">
            <div className="header">
                <div className="header-left">
                    <div>
                        <button className="airbnb-icon">
                            <i className="fa-brands fa-airbnb fa-3x"></i>
                            <NavLink exact to="/" className="icon-text">airbnb</NavLink>
                        </button>
                    </div>
                </div>
                <div>
                    {isLoaded && sessionLinks}
                </div>
            </div>
            {/* {categoriesBar()} */}
        </div>

    );
}

export default Navigation;
