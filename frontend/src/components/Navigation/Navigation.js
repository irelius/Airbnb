// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser, "test");

    const test = "testprops"

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div>
            <NavLink exact to="/">AirBnB</NavLink>
            {isLoaded && sessionLinks}
            <button onClick={() => console.log(sessionUser)}>
                Current Session User
            </button>
        </div>
    );
}

export default Navigation;
