import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

class ScheduleTableCell extends React.Component {
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

    deleteSchedule = (plantId, scheduleId) => {
        this.toggleModal();
        this.props.deleteSingleSchedule(plantId, scheduleId);
    }

    render() {
        return (
            <RowContainer>
                <DeleteModal onClose={this.closeModal} open={this.state.modalOpen}>
                    <ModalBox>
                        <h3>Are You Sure You Want To Delete This Watering Time?</h3>
                        <ModalButton no="true"  onClick={this.toggleModal}>No</ModalButton>
                        <ModalButton yes="true" onClick={e => this.deleteSchedule(this.props.plantId, this.props.schedule.id)}>Delete</ModalButton> 
                    </ModalBox>
                </DeleteModal>
                <Cell align="left">{moment(this.props.schedule.watering_time).format('MMM, Do YYYY, h:mm a')}</Cell>
                <Cell className="hide-on-mobile" align="center">{(moment(this.props.schedule.watering_time).fromNow())}</Cell>
                <Cell align="right"><ActionButton delete onClick={this.toggleModal}><i className="fas fa-minus-square"></i></ActionButton></Cell> 
            </RowContainer> 
        )
    }
    
}

const ModalButton = styled(Button)`
    && {
        font-size: 1.6rem;
        width: 45%;
        margin: 4px 8px;
        color: white;
        background: ${props => {
            if(props.yes) return props.theme.error;
            if(props.no) return props.theme.primary;
        }};
        &:hover {
            background: ${props => {
            if(props.yes) return props.theme.errorLight;
            if(props.no) return props.theme.primaryLight;
        }};
        }
    }
`;

const DeleteModal = styled(Dialog)`
    && {
        font-size: 1.6rem;
        padding: 12px;
        text-align: center;
    }
`;

const ModalBox = styled(Paper)`
    && {
        font-size: 1.6rem;
        padding: 12px;
        text-align: center;
    }
`;

const RowContainer = styled(TableRow)`
    && {
        @media (max-width: ${props => props.theme.tableBreakPoint}) {
            &:nth-of-type(odd) {
                background: rgba(0, 0, 0, .15);
            }
        }
    }
    
`;

const Cell = styled(TableCell)`
    && {
        font-size: 2rem;
        @media (max-width: ${props => props.theme.tableBreakPoint}) {
            display: block;
            width: 100%;
            text-align: center;
            padding: 3px;
            &:last-of-type {
                padding-right: 6px;
            }
            &.hide-on-mobile {
                display: none;
            }
        }
    }
`;

const ActionButton = styled.span`
    font-size: 1.6rem;
    i {
        font-size: 2.3rem;
    }
    margin: 0 4px;
    color: ${props => {
        if(props.delete) return props.theme.error;
        if(props.edit) return props.theme.warning;
    }};
    text-shadow: 0px 0px 1px black;

    &:hover {
        cursor: pointer;
    }

    a {
        color: ${props => {
            if(props.delete) return props.theme.error;
            if(props.edit) return props.theme.warning;
        }};
        text-decoration: none;
        &:visited {
            color: ${props => {
                if(props.delete) return props.theme.error;
                if(props.edit) return props.theme.warning;
            }};
            text-decoration: none;
        }
    }
`;

ScheduleTableCell.propTypes = {
    plantId: PropTypes.number.isRequired, 
    deleteSingleSchedule: PropTypes.func.isRequired,
    schedule: PropTypes.shape({
        id: PropTypes.number.isRequired,
        watering_time: PropTypes.string.isRequired
    }).isRequired
}

export default withTheme(ScheduleTableCell);