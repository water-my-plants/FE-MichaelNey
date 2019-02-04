import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled, {withTheme} from 'styled-components';

import PrivateRoute from './components/PrivateRoute';
import Home from './components/views/Home';
import Login from './components/views/Login';
import Logout from './components/views/Logout';
import Register from './components/views/Register';
import Navigation from './components/Navigation';
import Notifications from './components/Notifications';
import LoadUser from './components/LoadUser';
class App extends Component {
  
  render() {

    return (
      <AppContainer>
        {/* We place Navigation in a Route to pass props to it. This is because our use of connect HOC from react-redux breaks the NavLink
        component not updating with new location. This is a proper fix from React-Router documentation, to stop the component from not re-rendering with a new
        NavLink click.
        */}
        <LoadUser />
        <Route path="/" render={props => <Navigation {...props} />} />
        <Notifications />
        <AppPageContent>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/logout" render={props => <Logout {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/register" render={props => <Register {...props} />} />
        </AppPageContent>
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  background: ${props => props.theme.backgroundLight};
  min-height: 100vh;
  padding: 0;
  margin: 0;
`;

const AppPageContent = styled.div`
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
`;

export default withTheme(App);
