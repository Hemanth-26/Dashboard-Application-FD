import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { GlobalContext } from '../../context';

// handle the public routes

function PublicRoute(Component, PreLoginLayout) {
    // const { state: { isLoggedIn } } = useContext(GlobalContext);
    // const isLoggedIn = !!localStorage.getItem('authToken')
    
    // return !isLoggedIn ? <PreLoginLayout> <Component /> </PreLoginLayout>: <Navigate replace to="/nhub" />
    return <PreLoginLayout> <Component /> </PreLoginLayout>
}

export default PublicRoute;