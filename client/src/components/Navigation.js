import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
class Navigation extends React.Component {
    render() {
        return (
            <Nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </Nav>
        )
    }
}

const Nav = styled.nav`
    width: 100%;
    background: ${props => props.theme.primary};
    color: white;
    font-size: 2rem;
    padding: 12px;
    margin-bottom: 24px;
    box-shadow: 0px 1px 3px black;

    a {
        margin: 0 4px;
    }
`;

export default Navigation;