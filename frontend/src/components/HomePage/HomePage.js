import "./HomePage.css"
import Header from "./Header"
import Spots from "./Spots/Spots"
import Categories from "./Categories";
import Footer from "./Footer";
// import { NavLink } from 'react-router-dom';

function HomePage() {
    // const sessionUser = useSelector(state => state.session.user)
    // const dispatch = useDispatch();


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
