import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './Auth'
import Unauthorized from "../error/401"

export const ProtectedRoutes = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={props => {
			if (auth.isAuthenciated()) {
				if (!{ ...rest }.hasAccess) {
					console.log(auth.hasAccess())
					if (auth.hasAccess())
						return <Component {...props} />
					else
						return <Unauthorized />
				}
				else
					return <Component {...props} />
			}
			else {
				return <Redirect to="/" />
			}
		}
		} />
	);
}