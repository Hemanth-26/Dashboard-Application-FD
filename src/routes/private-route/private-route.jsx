import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../../context';

// handle the private routes

function PrivateRoute(Component, PostLoginLayout) {
    const { state: { isLoggedIn } } = useContext(GlobalContext);
    
    const token = !!localStorage.getItem('authToken');

    return (isLoggedIn || token) ? <PostLoginLayout> <Component /> </PostLoginLayout> : <Navigate to="/login" />;
}

export default PrivateRoute;