import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import Paper from '@material-ui/core/Paper';
import EditProfileForm from '../EditProfileForm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }
    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                modalOpen: !prevState.modalOpen
            }
        });
    }

    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        //User object, to be spread into our EditProfileForm props.
        let user = {
            username: this.props.username,
            email: this.props.email,
            phone: this.props.phone
        }
        return (
            <div>
                <PlantInfo>
                    <h1>{this.props.username}</h1>
                    <p><strong>Email:</strong> {this.props.email}</p>
                    <p><strong>Phone:</strong> {this.props.phone}</p>
                    <ModalButton onClick={this.toggleModal}>Edit Profile</ModalButton>
                </PlantInfo>
                <EditFormModal onClose={this.closeModal} open={this.state.modalOpen}>
                    <EditProfileForm {...user} userId={this.props.userId} updatingUser={this.props.updatingUser} updateUser={this.props.updateUser} toggleModal={this.toggleModal} />
                </EditFormModal>
            </div>
        )
    }
}

const ModalButton = styled(Button)`
    && {
        font-size: 1.6rem;
        width: 50%;
        margin: 4px auto;
        color: white;
        background: ${props => props.theme.primary};
        &:hover {
            background: ${props => props.theme.primaryLight};
        }
    }
`;

const EditFormModal = styled(Dialog)`
    && {
        font-size: 1.6rem;
        padding: 12px;
        text-align: center;
    }
`;

const PlantInfo = styled(Paper)`
    position: relative;
    width: 95%;
    margin: 0 auto;
    font-size: 1.6rem;
    padding: 18px;
    text-align: center;
    h1 {
        font-size: 3.2rem;
    }

    strong {
        padding: 0 8px;
    }

    @media (max-width: ${props => props.theme.small}) {
        width: 98%;
    }
`;

Profile.propTypes = {
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    updateUser: PropTypes.func.isRequired,
    updatingUser: PropTypes.bool.isRequired,
    userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    return {
        username: state.userReducer.username,
        email: state.userReducer.email,
        phone: state.userReducer.phone,
        userId: state.userReducer.userId,
        updatingUser: state.userReducer.updatingUser,
    }
}

export default connect(mapStateToProps, { updateUser })(Profile);