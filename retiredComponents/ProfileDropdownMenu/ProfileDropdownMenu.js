// import "./ProfileDropdownMenu.css"

// import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import { useHistory } from "react-router-dom";
// import { logoutThunk } from "../../store/session";

// const ProfileDropdownMenu = ({ user }) => {
//     const dispatch = useDispatch();
//     const history = useHistory()
//     const [showMenu, setShowMenu] = useState(false);

//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     useEffect(() => {
//         if (!showMenu) return;
//         const closeMenu = () => {
//             setShowMenu(false);
//         };
//         document.addEventListener('click', closeMenu);
//         return () => document.removeEventListener("click", closeMenu);
//     }, [showMenu]);

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(logoutThunk());
//     };

//     return (
//         <div id="profile-button-main-container">
//             <button id="profile-button" onClick={openMenu} className="pointer">
//                 <i id="profile-button-bars" className="fa-solid fa-bars" />
//                 <div id='profile-button-person-container'>
//                     <i id="profile-button-person" className="fa-solid fa-user fa-lg" />
//                 </div>
//             </button>
//             <div id="profile-button-dropdown-container">
//                 {showMenu && (
//                     <div id="profile-dropdown">
//                         <div id="profile-dropdown-username">
//                             {user.userName}
//                         </div>
//                         <div id="profile-dropdown-email">
//                             {user.email}
//                         </div>
//                         <div id="manage-listings" onClick={() => history.push("/manage-listings")} className="pointer">
//                             Manage Your Listings
//                         </div>
//                         <div id="logout-button" onClick={logout} className="pointer">
//                             Log Out
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ProfileDropdownMenu;
