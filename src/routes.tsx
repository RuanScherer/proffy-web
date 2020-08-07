import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'

function Routes() {
    const isLogged = localStorage.getItem('accessToken') ? true : false

	function PublicRoute({ component: Component, ...rest }: any) {
		return (
			<Route {...rest} render={props => {
				if (isLogged) return <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
				return  <Component {...rest} />
			}}/>
		)
	}

	function PrivateRoute({ component: Component, ...rest }: any) {
		return (
			<Route {...rest} render={props => {
				if (!isLogged) return <Redirect to={{ pathname: "/", state: { from: props.location } }}	/>
				return <Component {...rest} />
			}}/>
		)
    }
    
    return (
        <BrowserRouter>
            <PublicRoute exact path="/" component={Login}/>
            <PrivateRoute path="/home" component={Landing}/>
            <PrivateRoute path="/study" component={TeacherList}/>
            <PrivateRoute path="/give-classes" component={TeacherForm}/>
        </BrowserRouter>
    )
}

export default Routes