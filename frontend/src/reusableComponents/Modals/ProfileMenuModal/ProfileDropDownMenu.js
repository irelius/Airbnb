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
        history.push('/')

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
        <div id="profile-main-container">
            <button id="profile-button-container" className="ffffff pointer" onClick={openMenu}>
                <i id="profile-bars" className="fa-solid fa-bars" />
                <div id='profile-icon-container'>
                    <i id="profile-icon" className="fa-solid fa-user fa-lg" />
                </div>
            </button>
            <div id="profile-dropdown-main-container">
                {showMenu && (
                    <div id="profile-dropdown-container" className="shadow ffffff" onClick={handleOptionClick}>
                        <section>
                            {user.userName}
                        </section>
                        <section>
                            {user.email}
                        </section>
                        <section className="f7f7f7-hover pointer" onClick={() => history.push("/manage-listings")}>
                            Manage Your Listings
                        </section>
                        <section className="f7f7f7-hover pointer" onClick={logout}>
                            Log Out
                        </section>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div id="profile-main-container">
            <button id={`profile-button-container${showMenu ? '-shadow' : ''}`} className="ffffff pointer" onClick={openMenu}>
                <i id="profile-bars" className="fa-solid fa-bars" />
                <div id='profile-icon-container'>
                    <i id="profile-icon" className="fa-solid fa-user fa-lg" />
                </div>
            </button>
            <div id="profile-dropdown-main-container">
                {showMenu && (
                    <div id="profile-dropdown-container" className="shadow ffffff" onClick={handleOptionClick}>
                        <section className="f7f7f7-hover pointer bold" onClick={signInDemo}>
                            Sign in as Demo User
                        </section>
                        <section className="f7f7f7-hover pointer" onClick={() => history.push('/signup')}>
                            Sign Up
                        </section>
                        <section className="f7f7f7-hover pointer" onClick={(e) => e.stopPropagation()}>
                            <LoginFormModal />
                        </section>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileDropDownMenu;
