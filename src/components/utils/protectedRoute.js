import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isLoggedIn } from './auth';

const ProtectedRoute = ({ component: ProtectedComponent, ...rest }) => {
    return (
        <Route
            {...rest}
            render={routeProps => {
                if (!isLoggedIn()) return (
                    <Redirect to={{
                        pathname: '/unauthorized-page',
                        state: { from: routeProps.location.pathname },
                    }} />
                );
                return <ProtectedComponent {...routeProps} />
            }}
        />
    );
};

export default ProtectedRoute;