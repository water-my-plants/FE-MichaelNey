import React from 'react';
import { userLoad } from '../actions';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux returned null with localstorage right at loadtime. Solution is this component that successfully retrieves localStorage values as requested AFTER load, so we actually get the values we need.
//If the user ID + JWT Token are in local storage, then we fetch the user details from the server, then load them into our redux store!
class PopulateUser extends React.Component {

    componentDidMount() {
        let token = localStorage.getItem('token');
        let id = localStorage.getItem('userId');

        if(token) {
        let url = `${process.env.REACT_APP_API}/users/${id}`;
        this.props.userLoad(url, token);
        }
    }

    render() {
        if(this.props.returning) {
            return <LoadingContainer>
                    <LoadingSpinner size="156" />
                   </LoadingContainer>
        }
        return (
            null
        )
    }
}

const LoadingContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: ${props => props.theme.backgroundLight};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingSpinner = styled(CircularProgress)`
    && {
        height: 156px;
        width: 156px;
        color: ${props => props.theme.primaryDark};
    }
`; 

const mapStateToProps = (state) => {
    return {
        returning: state.userReducer.returning
    }
}

export default connect(mapStateToProps, { userLoad })(withTheme(PopulateUser));