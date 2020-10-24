import React from 'react';

// CONTAINERS & COMPONENTS
import Users from '../../Containers/Users/Users';
import User from '../../Components/User/User';

// CONTEXT
import { DataProvider } from '../../Context/UsersContext/UsersContext';

import { BrowserRouter, Redirect, Route, Switch, HashRouter } from 'react-router-dom';

const body = () => {
  return (
    <DataProvider>
      <HashRouter>
        <Switch>

          <Route
            exact
            path="/"
            render={() => {
              return (
                <Redirect
                  to="/user"
                />
              )
            }} />

          <Route
            path="/user/:id"
            component={User} />

          <Route
            path="/user"
            component={Users} />
        </Switch>
      </HashRouter>
    </DataProvider>
  )
}

export default body;