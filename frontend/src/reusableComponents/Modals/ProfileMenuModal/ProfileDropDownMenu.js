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

    const signInDemo = (e) => {
        console.log('test test, demo sign in func entered')

        // e.preventDefault();

        const credential = "demo@aa.io"
        const password = "password"

        const demoUser = {
            credential: "demo@aa.io",
            password: "password"
        }
        return dispatch(loginThunk({credential, password}));
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
            <button id="profile-button-container" className="ffffff-bg pointer" onClick={openMenu}>
                <i id="profile-bars" className="fa-solid fa-bars" />
                <div id='profile-icon-container'>
                    {user.userName.slice(0, 1)}
                </div>
            </button>
            <div id="profile-dropdown-main-container">
                {showMenu && (
                    <div id="profile-dropdown-container" className="shadow ffffff-bg" onClick={handleOptionClick}>
                        <section className="semi-bold">
                            {user.userName}
                        </section>
                        <section className="semi-bold">
                            {user.email}
                        </section>
                        <section className="f7f7f7-bg-hover pointer" onClick={() => history.push("/manage-listings")}>
                            Manage Your Listings
                        </section>
                        <section className="f7f7f7-bg-hover pointer" onClick={logout}>
                            Log Out
                        </section>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div id="profile-main-container">
            <button id={`profile-button-container${showMenu ? '-shadow' : ''}`} className="ffffff-bg pointer" onClick={openMenu}>
                <i id="profile-bars" className="fa-solid fa-bars" />
                <div id='profile-icon-container'>
                    <i id="profile-icon" className="fa-solid fa-user fa-lg" />
                </div>
            </button>
            <div id="profile-dropdown-main-container">
                {showMenu && (
                    <div id="profile-dropdown-container" className="shadow ffffff-bg" onClick={handleOptionClick}>
                        <section className="f7f7f7-bg-hover pointer bold" onClick={(e) => signInDemo(e)}>
                            Sign in as Demo User
                        </section>
                        <section className="f7f7f7-bg-hover pointer" onClick={() => history.push('/signup')}>
                            Sign Up
                        </section>
                        <section className="f7f7f7-bg-hover pointer" onClick={(e) => e.stopPropagation()}>
                            <LoginFormModal />
                        </section>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileDropDownMenu;
