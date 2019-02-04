import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

class Home extends React.Component {
    
    render() {
        return (
            <Container>
                <header>Welcome, {this.props.username}</header>
            </Container>
        )
    }
}

const Container = styled.div`
    text-align: center;

    header {
        font-size: 36px;
    }
`;

const mapStateToProps = state => {
    return {
        username: state.userReducer.username
    }
}

export default connect(mapStateToProps, { })(Home);