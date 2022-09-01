import "./Footer.css"


function Footer() {
    return (
        <div className="footer">
            <div className="footer-left">
                <div className="footer-left-list">
                    <p>2022 Airbnb, Inc.</p>
                    <p>*</p>
                    <p>Privacy</p>
                    <p>*</p>
                    <p>Terms</p>
                    <p>*</p>
                    <p>Sitemap</p>
                    <p>*</p>
                    <p>Destinations</p>
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-right-list">
                    <button>Web</button>
                    <p>English(US)</p>
                    <button>$ USD</button>
                    <p>Support & Resources</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
