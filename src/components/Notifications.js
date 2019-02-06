import React from 'react';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { removeNotif } from '../actions';
import PropTypes from 'prop-types';
class Notifications extends React.Component {
    displayed = [];

    storeDisplayed = (id) => {
        this.displayed = [...this.displayed, id];
    }

    shouldComponentUpdate({ notifications: newSnacks = [] }) {
        const { notifications } = this.props;
        let notExists = true;
        for (let i = 0; i < newSnacks.length; i++) {
            if (notExists) continue;
            notExists = notExists || !notifications.filter(({ key }) => newSnacks[i].key === key).length;
        }
        return notExists;
    }

    componentDidUpdate() {
        const { notifications = [] } = this.props;

        notifications.forEach(notification => {
            // Do nothing if snackbar is already displayed
            if (this.displayed.includes(notification.key)) return;
            // Display snackbar using notistack
            this.props.enqueueSnackbar(notification.message, notification.options);
            // Keep track of snackbars that we've displayed
            this.storeDisplayed(notification.key);
            // Dispatch action to remove snackbar from redux store
            this.props.removeNotif(notification.key);
        });
    }

    render() {
        return null;
    }
}

Notifications.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    onPresentSnackbar: PropTypes.func.isRequired,
    removeNotif: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    notifications: state.notificationReducer.notifications
});

export default connect(
    mapStateToProps, { removeNotif }
)(withSnackbar(Notifications));