import "./HomePage.css"
import Spots from "./Spots/Spots"
import Footer from "./Footer";

function HomePage() {
    return (
        <>
            <div className="homepage-main">
                <Spots />
                <Footer />
            </div>
        </>
    )

}

export default HomePage;
