import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
 } from 'react-router-dom'
import { Home } from './views/Home'
import { Login } from './views/Auth'
import { PrivateRoute } from './views/routeGuard'
import { Provider } from 'react-redux'
import { store } from './store/index'

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </Router>
      </Provider>
    </div>
  );

}

export default App;
