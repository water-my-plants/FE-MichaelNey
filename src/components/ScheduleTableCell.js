import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link }from 'react-router-dom';

import styled, { withTheme } from 'styled-components';

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

    deleteSchedule = (id) => {
        this.toggleModal();
        // this.props.deleteSchedule(id);
    }

    render() {
        return (
            <TableRow>
                <DeleteModal open={this.state.modalOpen}>
                    <ModalBox>
                        <h3>Are You Sure You Want To Delete This Watering Schedule?</h3>
                        <ModalButton no  onClick={this.toggleModal}>No</ModalButton>
                        <ModalButton yes  onClick={e => this.deleteSchedule(this.props.plant.id)}>Yes</ModalButton>
                    </ModalBox>
                </DeleteModal>
                <Cell align="left">{this.props.plant.name}</Cell>
                <Cell align="center">{this.props.plant.characteristics ? `${this.props.plant.characteristics}` : <LightText>N/A</LightText>}</Cell>
                <Cell align="center">{this.props.plant.description ? `${this.props.plant.description}` : <LightText>N/A</LightText>}</Cell>
                <Cell align="right"><ActionButton edit><Link to={`/plants/${this.props.plant.id}`}><i className="fas fa-edit"></i></Link></ActionButton><ActionButton delete onClick={this.toggleModal}><i className="fas fa-times-circle"></i></ActionButton></Cell>
            </TableRow> 
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

const Cell = styled(TableCell)`
    && {
        font-size: 1.6rem;
    }
`;

const LightText = styled.span`
    color: rgba(0, 0, 0, .25);
`;

const ActionButton = styled.span`
    font-size: 1.6rem;
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

export default withTheme(ScheduleTableCell);