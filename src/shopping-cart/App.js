import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './page/Home';
import SignIn from './page/SignIn';
import PrivateRoute from './components/PrivateRoute'
import SignUp from './page/SignUp'
import Account from './page/Account'
import "./App.css";




export default function App() {

    return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute exact path='/'>
					<Home />
				</PrivateRoute>
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/signup' component={SignUp} />
				<PrivateRoute exact path='/home'>
					<Home />
				</PrivateRoute>
				<PrivateRoute exact path='/account'>
					<Account />
				</PrivateRoute>
			</Switch>
		</BrowserRouter>
	);
}
