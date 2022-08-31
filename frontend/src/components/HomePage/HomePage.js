// import { useDispatch, useSelector } from "react-redux";
// import { logoutThunk } from "../../store/session";
import "./HomePage.css"
import Header from "./Header"
import Spots from "./Spots/Spots"
import Categories from "./Categories";
import Footer from "./Footer";
// import Navigation from "../Navigation"
// import ProfileButton from "../Navigation/ProfileButton"

function HomePage() {
    // const sessionUser = useSelector(state => state.session.user)
    // const dispatch = useDispatch();

    return (
        <div className="homepage-main">
            <Header />
            <Categories />
            <Spots />
            <Footer />
        </div>
    )

}

export default HomePage;
