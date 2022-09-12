// frontend/src/components/Navigation/ProfileButton.js
import "./ProfileButton.css"
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { logoutThunk } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutThunk());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-username">
            {user.userName}
          </div>
          <div className="profile-dropdown-email">
            {user.email}
          </div>
          <button className="manage-listings">
            <NavLink exact to="/manage-listings">Manage Your Listings</NavLink>
          </button>
          <button className="logout-button" onClick={logout}>Log Out</button>
        </div>

      )}
    </>
  );
}

export default ProfileButton;
