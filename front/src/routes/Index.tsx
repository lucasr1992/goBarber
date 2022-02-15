import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/Signin/Index';
import SignUp from '../pages/SignUp/Index';
import Dashboard from '../pages/Dashboard/Index';
import Route from './Route';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn}/>
        <Route path="/signup"  component={SignUp}/>
        <Route path="/dashboard"  component={Dashboard} isPrivate />
    </Switch>
)

export default Routes;