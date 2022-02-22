import React, {useContext} from "react";
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from "./../../context";

export const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser, currentStatus} = useContext(AuthContext);
    return (
        
        currentStatus ?
        <Route 
            {...rest}
            render={routeProps => 
                    currentUser ? (
                        <RouteComponent {...routeProps} />
                    )
                    : 
                    (
                        <Redirect to={"/login"} />
                    )

            }
        />
        :
        null
        
    )

}
