import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import SpotPageIntro from "./components/SpotPage/SpotPageIntro";
import SpotPageForm from "./components/SpotPage/SpotPageForm";
import ListUserSpot from "./components/SpotPage/ListUserSpot";

import * as sessionActions from "./store/session";
import EditSpotForm from "./components/SpotPage/EditSpotForm/EditSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSessionThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const currentUser = useSelector(state => state.user);

  console.log(currentUser, "test")

  return isLoaded && (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/signup">
          <SignUpFormPage />
        </Route>
        <Route exact path="/become-a-host/intro">
          <SpotPageIntro />
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
      </Switch>
    </>

  );
}

export default App;
