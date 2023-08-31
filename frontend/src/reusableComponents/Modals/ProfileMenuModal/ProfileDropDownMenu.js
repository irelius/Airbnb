import "./ProfileDropDownMenu.css"

import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { loginThunk, logoutThunk } from "../../../store/session"
import LoginFormModal from "../LoginModal";

const ProfileDropDownMenu = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    const closeMenu = () => {
        setShowMenu(false);
    };
    const logout = (e) => {
        e.preventDefault();
        dispatch(logoutThunk());
    };
    const signInDemo = () => {
        const demoUser = {
            credential: "demo@aa.io",
            password: "password"
        }
        dispatch(loginThunk(demoUser));
    }
    const handleOptionClick = (e) => {
        e.stopPropagation();
        closeMenu(); // Close the menu when any option is clicked
    };

    useEffect(() => {
        if (!showMenu) return;
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return user ? (
        <div id="profile-button-main-container">
            <button id="profile-button" onClick={openMenu} className="pointer">
                <i id="profile-button-bars" className="fa-solid fa-bars" />
                <div id='profile-button-person-container'>
                    <i id="profile-button-person" className="fa-solid fa-user fa-lg" />
                </div>
            </button>
            <div id="profile-button-dropdown-container">
                {showMenu && (
                    <div id="profile-dropdown" className="shadow" onClick={handleOptionClick}>
                        <div id="profile-dropdown-username">
                            {user.userName}
                        </div>
                        <div id="profile-dropdown-email">
                            {user.email}
                        </div>
                        <div id="manage-listings" className="profile-hover pointer" onClick={() => history.push("/manage-listings")}>
                            Manage Your Listings
                        </div>
                        <div id="logout-button" className="profile-hover pointer" onClick={logout}>
                            Log Out
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div id="profile-button-main-container">
            <button id={`profile-button${showMenu ? '-shadow' : ''}`} onClick={openMenu} className="pointer">
                <i id="profile-button-bars" className="fa-solid fa-bars" />
                <div id='profile-button-person-container'>
                    <i id="profile-button-person" className="fa-solid fa-user fa-lg" />
                </div>
            </button>
            <div id="profile-button-dropdown-container">
                {showMenu && (
                    // className={`profile-button-dropdown-container${showMenu ? ' show' : ''}`}
                    <div id="profile-dropdown" className="shadow" onClick={handleOptionClick}>
                        <aside id="profile-demo-login" className="profile-hover" onClick={signInDemo}>
                            Sign in as Demo User
                        </aside>
                        <aside id="profile-sign-in" className="profile-hover" onClick={() => history.push('/signup')}>
                            Sign Up
                        </aside>
                        <aside id="profile-log-in" className="profile-hover" onClick={(e) => e.stopPropagation()}>
                            <LoginFormModal />
                        </aside>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileDropDownMenu;
