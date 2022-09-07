import "./HomePage.css"
import Header from "./Header"
import Spots from "./Spots/Spots"
import Categories from "./Categories";
import Footer from "./Footer";

function HomePage() {
    return (
        <>
            <div className="homepage-main">
                <Header />
                <Categories />
                <Spots />
                <Footer />
            </div>
        </>
    )

}

export default HomePage;
