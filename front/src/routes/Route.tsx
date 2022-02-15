import React from 'react';
import { useAuth } from '../context/AuthContext';
import {  RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect} from 'react-router-dom';

interface RouterProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}


const Route: React.FC<RouterProps> = ({ isPrivate = false, component: Component, ...rest}) => {
    const { user } = useAuth();

    return (<ReactDOMRoute {...rest} render={( location ) => {
        return isPrivate === !!user ? (
            <Component/>
        ) : (
            <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard'}} />
        )
    }}/>);

};

export default Route;