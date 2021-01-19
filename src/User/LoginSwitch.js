import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import SignInSide from "./SignInSide";
import SignUpSide from "./SignUpSide";
import MainPage from "../MainPage/MainPage";

const LoginSwitch = (props) =>
    <Router>
        <Switch>
            <Route path="/signin/" component={SignInSide}/>
            <Route path="/signup/" component={SignUpSide}/>
            <Route path="/" component={MainPage}/>}
        </Switch>
    </Router>
;

export default LoginSwitch;