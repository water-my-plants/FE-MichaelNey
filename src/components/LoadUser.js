import React from 'react';
import { userLoad, userLogout, addNotifHelper } from '../actions';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
//Redux returned null with localstorage right at loadtime. Solution is this component that successfully retrieves localStorage values as requested AFTER load, so we actually get the values we need.
//If the user ID + JWT Token are in local storage, then we fetch the user details from the server, then load them into our redux store!
class PopulateUser extends React.Component {

    componentDidMount() {
        setInterval(this.checkTokenExpiry, 30000);
        let token = localStorage.getItem('token');
        let id = localStorage.getItem('userId');
        if(this.checkTokenExpiry()) return;
        if(token) {
        let url = `${process.env.REACT_APP_API}/users/${id}`;
        this.props.userLoad(url, token);
        }
    }

    checkTokenExpiry = () => {
        let expire = localStorage.getItem('tokenExp');
        if(expire) {
            if(Number(expire) < Date.now()) {
                this.props.userLogout();
                this.props.history.push('/login');
                this.props.addNotifHelper({message: 'Your session has expired.'}, 'error')
                return true;
            }
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
    display: none;  
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
        display: none;  
        height: 156px;
        width: 156px;
        color: ${props => props.theme.primaryDark};
    }
`; 

PopulateUser.propTypes = {
    addNotifHelper: PropTypes.func.isRequired,
    returning: PropTypes.bool,
    userLoad: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        returning: state.userReducer.returning
    }
}


export default connect(mapStateToProps, { userLoad, userLogout, addNotifHelper })(withTheme(PopulateUser));