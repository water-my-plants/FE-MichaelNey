import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ClickOutHandler from 'react-onclickout';
import PropTypes from 'prop-types';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navOpen: false
        };
    }

    toggleNav = () => {
        this.setState(prevState => {
            return {
                navOpen: !prevState.navOpen
            }
        });
    }

    closeNav = () => {
        this.setState({
            navOpen: false
        })
    }

    render() {
        return (
            <ClickOutHandler onClickOut={this.closeNav}>
                <TopBar position="static">
                    <Nav >
                        <Brand>Water My Plants <MenuExpand onClick={this.toggleNav}><i className="fas fa-bars"></i></MenuExpand></Brand>
                        <NavLinks open={this.state.navOpen}>
                        {!this.props.loggedIn ? null :
                            <>
                                <NavbarLink activeClassName="active" exact to="/plants">Plants</NavbarLink>
                                <NavbarLink activeClassName="active" to="/plants/add">Add Plants</NavbarLink>
                            </>
                        }
                        </NavLinks>
                        <NavActions open={this.state.navOpen}>
                            {/* If we aren't logged in, only show the Login link. Otherwise, show all the navigation options and our users profile name + link to profile */}
                            {!this.props.loggedIn ? <><NavbarLink activeClassName="active" to="/login">Login</NavbarLink><NavbarLink activeClassName="active" to="/register">Register</NavbarLink></> :
                            <>
                                <NavbarLink activeClassName="active" to="/profile">{this.props.username} <i className="fas fa-user-circle"></i></NavbarLink>
                                <NavbarLink activeClassName="active" to="/logout">Logout <i className="fas fa-sign-out-alt"></i></NavbarLink>
                            </>
                            }
                        </NavActions>
                    </Nav>
                </TopBar>
            </ClickOutHandler>
        )
    }
}

const MenuExpand = styled.span`
    padding: 0px 12px;
    font-size: 2.8rem;
    text-align: right;
    &:hover {
        cursor: pointer;
    }
    display: none;
    @media (max-width: ${props => props.theme.large}) {
        display: inline-block;
    }
`;

const Brand = styled.span`
    font-size: 2rem;
    color: white;
    padding: 12px;
    width: 30%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: ${props => props.theme.large}) {
        width: 100%;
    }
`;

const NavLinks = styled.div`
    width: 40%;
    font-size: 2rem;
    color: white;
    text-align: center;
    @media (max-width: ${props => props.theme.large}) {
        flex-direction: column;
        display: ${props => {
            if(props.open) return 'flex';
            return 'none';
        }};
        width: 100%;
        a {
            /* display: none; */
        }
    }
`;

const NavbarLink = styled(NavLink)`
    padding: 18px 20px;
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

    @media (max-width: ${props => props.theme.large}) {
        width: 100%;
        text-align: center;
    }
`;

const NavActions = styled.div`
    font-size: 2rem;
    color: white;
    width: 30%;
    text-align: right;
    @media (max-width: ${props => props.theme.large}) {
        width: 100%;
        text-align: center;
        display: ${props => {
            if(props.open) return 'flex';
            return 'none';
        }};
        flex-direction: column;
    }
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
        align-items: baseline;
        @media (max-width: ${props => props.theme.large}) {
            padding: 0;
        }   
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

Navigation.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        loggedIn: state.userReducer.loggedIn
    }
}

export default connect(mapStateToProps, {})(Navigation);