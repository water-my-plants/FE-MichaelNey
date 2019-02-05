import React from 'react';
import styled from 'styled-components';
const Footer = props => {

    return (
        <Container>

        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 51px;
    background: ${props => props.theme.primary};
    position: absolute;
    bottom: -32px;
`;

export default Footer;