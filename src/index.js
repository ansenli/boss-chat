// import React, { PureComponent, Fragment } from 'react';
import React, { Fragment } from 'react';
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'
import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import  GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import './config'
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))



ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<Fragment>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/bossinfo' component={BossInfo} ></Route>
					<Route path='/geniusinfo' component={GeniusInfo} ></Route>
					<Route path='/login' component={Login}/>
					<Route path='/register' component={Register}/>
					<Route component ={Dashboard}></Route>
				</Switch>
            </Fragment>

		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
