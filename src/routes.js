import React from "react";
import { Switch, Route } from "react-router-dom";
import App from './App'
import Auth from './Components/Auth'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route  path='/header' component={Header} />
        <Route  path='/adminDashboard' component={AdminDashboard} />
        <Route  path='/clientDashboard/:id' component={ClientDashboard} />
    </Switch>
)