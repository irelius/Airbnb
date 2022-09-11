import "./Footer.css"
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <div className="footer-left">
                <div className="footer-left-list">
                    <p>2022 Airbnb Clone</p>
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-right-list">
                    <a href="https://www.linkedin.com/in/sbkihongbae/">LinkedIn</a>
                    <a href="https://github.com/irelius">GitHub</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
