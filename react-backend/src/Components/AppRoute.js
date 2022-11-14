import React from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes';
const AppRoute = ({ component: Component, ...rest }) => {
	return (
		{ ...rest }.isProtected ?
			<ProtectedRoutes {...rest} component={Component} /> :
			<Route {...rest} render={props => { return <Component {...props} /> }} />
	)
}


export default AppRoute;