// frontend/src/components/Navigation/index.js
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { loginThunk, restoreUserThunk } from '../../store/session';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreUserThunk());
    }, [dispatch]);


    const sessionUser = useSelector(state => state.session.user);

    const signInDemo = () => {
        console.log("func entered")
        const demoUser = {
            credential: "Demo-User",
            password: "demopassword"
        }
        dispatch(loginThunk(demoUser));
    }

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
                <button onClick={signInDemo}>Demo User</button>
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
        </div>

    );
}

export default Navigation;
