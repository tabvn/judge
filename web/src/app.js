import React, { Fragment } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from './hostory'
import { routes } from './router'

export default class App extends React.Component {
  render () {
    return (
      <Fragment>
        <Router history={history}>
          <Switch>
            {
              routes.map((route, index) => {
                return (
                  <Route key={index} exact path={route.path} component={route.component}/>
                )
              })
            }

          </Switch>
        </Router>
      </Fragment>

    )
  }
}