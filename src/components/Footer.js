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
    height: 22px;
    background: ${props => props.theme.primary};
    position: fixed;
    bottom: 0;
`;

export default Footer;