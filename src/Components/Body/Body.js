import React from 'react';

// CONTAINERS & COMPONENTS
import Users from '../../Containers/Users/Users';
import User from '../../Components/User/User';

// CONTEXT
import { DataProvider } from '../../Context/UsersContext/UsersContext';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const body = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Switch>

          <Route
            exact
            path="/user-records"
            render={() => {
              return (
                <Redirect
                  to="/user-records/user"
                />
              )
            }} />

          <Route
            path="/user-records/user/:id"
            component={User} />

          <Route
            path="/user-records/user"
            component={Users} />
        </Switch>
      </BrowserRouter>
    </DataProvider>
  )
}

export default body;