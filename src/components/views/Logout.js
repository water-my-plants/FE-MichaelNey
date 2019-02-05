import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogout } from '../../actions';

const Logout = (props) => {
    props.userLogout();
    return (
        <div>
            Logging you out...
            <Redirect to="/login" />
        </div>
    )
}

export default connect(null, { userLogout })(Logout);