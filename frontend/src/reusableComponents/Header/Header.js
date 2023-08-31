// reusableComponents/Header/Header.js
import './Header.css';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, restoreUserThunk } from '../../store/session';

import LoginFormModal from '../Modals/LoginModal';
import ProfileDropdownMenu from '../Modals/ProfileMenuModal';

function Header({ isLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(restoreUserThunk());
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className="header-right-container">
                <div id="header-host-button-container">
                    <button id="header-host-button" onClick={() => history.push("/become-a-host/property-form")}>Become a host</button>
                </div>
                <div className="header-profile-button-container">
                    <ProfileDropdownMenu user={sessionUser} />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div className="header-right-container">
                <div className="header-profile-button-container">
                    <ProfileDropdownMenu user={sessionUser} />
                </div>
            </div>
        );
    }

    return (
        <div className="header-main-container">
            <aside className="header-left-container">
                <section className="header-lairbnb-icon-container" onClick={() => history.push("/")}>
                    <img id="lairbnb-icon" src="https://raw.githubusercontent.com/irelius/Airbnb/main/frontend/public/assets/favicon-32x32.png"
                        alt="lairbnb-icon"
                    />
                    <p className="lairbnb-header-text">
                        Lairbnb
                    </p>
                </section>
            </aside>
            {isLoaded && sessionLinks}
        </div>
    )

}

export default Header;
