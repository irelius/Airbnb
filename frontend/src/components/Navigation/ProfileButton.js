// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logoutThunk } from "../../store/session";

function ProfileButton(sessionUser) {
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
        <ul className="profile-dropdown">
          <li>{sessionUser.username}</li>
          <li>{sessionUser.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
          <li>
            <button onClick={() => console.log(sessionUser)}>session user test</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
