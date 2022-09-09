import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import Navigation from "./components/Navigation";
import LoginFormModal from "./components/LoginFormModal";
import SignUpFormPage from "./components/SignUpFormPage";
import SpotPageForm from "./components/SpotPage/SpotPageForm";
import ListUserSpot from "./components/SpotPage/ListUserSpot";
import SpotDetailPage from "./components/SpotPage/SpotDetailPage/SpotDetailPage";
import EditSpotForm from "./components/SpotPage/EditSpotForm/EditSpotForm";
import SubmitReview from "./components/ReviewFormPage/SubmitReview";
import EditReview from "./components/ReviewFormPage/EditReview/EditReview";

import * as sessionActions from "./store/session";

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
          <Route exact path="/hosting">
            <ListUserSpot />
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
        </Switch>
      )}
    </>

  );
}

export default App;
