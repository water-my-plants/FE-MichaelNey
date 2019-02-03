import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled, {withTheme} from 'styled-components';

import Login from './components/views/Login';
import Register from './components/views/Register';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Navigation />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/register" render={props => <Register {...props} />} />
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

export default withTheme(App);
