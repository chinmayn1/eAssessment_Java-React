import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Paths from './Components/Paths'
import AppRoute from './Components/AppRoute'


function App() {
  return (
    <Router>
      <Switch>
        {Paths
          .map((route, index) => (
            <AppRoute key={index} exact={route.exact} path={route.path} component={route.componentName} isProtected={route.isProtected} hasAccess={route.hasAccess} />
          ))}
      </Switch>
    </Router>
  );
}

export default App;
