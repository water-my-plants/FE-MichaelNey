import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import theme from './styledTheme';
import { SnackbarProvider } from 'notistack';

const store = createStore(rootReducer, applyMiddleware(thunk)); //Create Redux Store, and pass it into our Provider component. Now our whole react app has access to the Provider if 
//they use the Connect Higher Order Component from react-redux!

ReactDOM.render(
    // ThemeProvider allows our components to use the withTheme HOC and access our Theme object properties for styling with styled-components
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                maxSnack={3}
            >
                <Router>
                    <App />
                </Router>
            </SnackbarProvider>
        </Provider>
    </ThemeProvider>, 
    document.getElementById('root')
);
