import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import Navigation from "./components/Navigation";
// import Navigation from "./reusableComponents/navigation/Navigation";
import SignUpFormPage from "./components/SignUpFormPage";
import SpotPageForm from "./components/SpotPage/SpotPageForm";
import SpotDetailPage from "./components/SpotPage/SpotDetailPage/SpotDetailPage";
import EditSpotForm from "./components/SpotPage/EditSpotForm/EditSpotForm";
import SubmitReview from "./components/ReviewFormPage/SubmitReview";
import Main from "./views/Main/Main";

import * as sessionActions from "./store/session";
import UserSpots from "./components/SpotPage/UserSpots";
// import Footer from "./reusableComponents/Footer";
import Footer from "./reusableComponents/Footer"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/signup">
            <SignUpFormPage />
          </Route>
          <Route exact path="/become-a-host/property-form">
            <SpotPageForm />
          </Route>
          <Route exact path="/manage-listings">
            <UserSpots />
          </Route>
          <Route exact path="/edit-spot/:spotId">
            <EditSpotForm />
          </Route>
          <Route exact path="/spot-details/:spotId">
            <SpotDetailPage />
          </Route>
          <Route exact path="/submit-review/:spotId">
            <SubmitReview />
          </Route>
          <Route exact path="/test">
            <Main />
          </Route>
        </Switch>
      )}
      <Footer />
    </>

  );
}

export default App;
