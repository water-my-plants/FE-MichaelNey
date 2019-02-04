import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';

class Navigation extends React.Component {
    render() {
        return (
            <TopBar position="static">
                <Nav>
                    <Brand>Water My Plants</Brand>
                    <NavLinks>
                    {!this.props.loggedIn ? null :
                        <>
                            {/* <NavbarLink activeClassName="active" to="/plants">Plants</NavbarLink> */}
                        </>
                    }
                    </NavLinks>
                    <NavActions>
                        {/* If we aren't logged in, only show the Login link. Otherwise, show all the navigation options and our users profile name + link to profile */}
                        {!this.props.loggedIn ? <NavbarLink activeClassName="active" to="/login">Login</NavbarLink> :
                        <>
                            <NavbarLink activeClassName="active" to="/profile">{this.props.username} <i className="fas fa-user-circle"></i></NavbarLink>
                            <NavbarLink activeClassName="active" to="/logout"><i className="fas fa-sign-out-alt"></i></NavbarLink>
                        </>
                        }
                        
                    </NavActions>
                </Nav>
            </TopBar>
        )
    }
}

const Brand = styled.span`
    font-size: 2rem;
    color: white;
    padding: 12px;
    width: 25%;
    text-align: left;
`;

const NavLinks = styled.div`
    font-size: 2rem;
    color: white;
    width: 50%;
    text-align: center;

    a {
        
    }
`;

const NavbarLink = styled(NavLink)`
    padding: 12px 20px;
    margin: 0 0;
    text-decoration: none;
    color: rgba(255, 255, 255, .60);
    transition: all .3s;
    &:hover {
        background: rgba(255, 255, 255, .10);
        color: white;
    }
    &.active {
        background: rgba(255, 255, 255, .10);
        color: white;
    }
    &:visited {
        text-decoration: none;
        color: rgba(255, 255, 255, .60);
    }

    i {
        padding: 0 8px;
    }
`;

const NavActions = styled.div`
    font-size: 2rem;
    color: white;
    width: 25%;
    text-align: right;
    padding: 0 12px;
`;

const TopBar = styled(AppBar)`
    && {
        background: ${props => props.theme.primary};
        margin-bottom: 24px;
        color: white;
        font-size: 2rem;
        padding: 0 12px;
        box-shadow: 0px 1px 3px black;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    
`;

const Nav = styled.nav`
    max-width: ${props => props.theme.maxWidth};
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        loggedIn: state.userReducer.loggedIn
    }
}

export default connect(mapStateToProps, {})(Navigation);