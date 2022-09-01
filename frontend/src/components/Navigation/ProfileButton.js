// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { logoutThunk } from "../../store/session";
// import { restoreSessionThunk } from "../../store/session";


function ProfileButton() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  // showing the menu
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // use effect for whenever "showMenu" changes
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // log out user
  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutThunk());
  };

  // customizing what the user sees when they click on the profile button
  const profileDropDown = () => {
    if (sessionUser) {
      return (
        <ul className="profile-dropdown">
          <li>{sessionUser.userName}</li>
          <li>{sessionUser.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li>
            <NavLink exact to="/login">Log In</NavLink>
          </li>
          <li>
            <NavLink exact to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      )
    }
  }

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div>
          {profileDropDown()}

        </div>
      )}
    </>
  );
}

export default ProfileButton;
