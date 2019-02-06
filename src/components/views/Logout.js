import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogout } from '../../actions';
import PropTypes from 'prop-types';
const Logout = (props) => {
    props.userLogout();
    return (
        <div>
            Logging you out...
            <Redirect to="/login" />
        </div>
    )
}

Logout.propTypes = {
    userLogout: PropTypes.func.isRequired
}

export default connect(null, { userLogout })(Logout);