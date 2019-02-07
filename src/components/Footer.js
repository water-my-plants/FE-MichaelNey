import React from 'react';
import styled from 'styled-components';
const Footer = props => {

    return (
        <Container>
            © 2019 WaterMyPlants. All rights reserved.
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 32px;
    background: ${props => props.theme.primary};
    position: fixed;
    bottom: 0;
    text-align: center;
    color: white;
    line-height: 32px;
    font-size: 1.6rem;
`;

export default Footer;