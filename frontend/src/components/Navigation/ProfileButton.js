// frontend/src/components/Navigation/ProfileButton.js
import "./ProfileButton.css"
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
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
          <div>
            {user.userName}
          </div>
          <div>
            {user.email}
          </div>

          <button onClick={logout}>Log Out</button>

        </div>

      )}
    </>
  );
}

export default ProfileButton;
