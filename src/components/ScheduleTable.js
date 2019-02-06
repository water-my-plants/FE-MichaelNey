import React from 'react';
import styled, { withTheme } from 'styled-components';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ScheduleTableCell from './ScheduleTableCell';
import Dialog from '@material-ui/core/Dialog';
import ScheduleForm from './ScheduleForm';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

class ScheduleTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            deleteModalOpen: false      
        }
    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                modalOpen: !prevState.modalOpen
            }
        });
    }

    toggleDeleteModal = () => {
        this.setState(prevState => {
            return {
                deleteModalOpen: !prevState.deleteModalOpen
            }
        });
    }
    
  render() {
    return (
      <TablePaper>
        <TableContainer>
            <Head>
                <TableRow>
                    <Cell align="left">Time</Cell>
                    <Cell align="center">Distance</Cell>
                    <Cell align="right">Actions</Cell>
                </TableRow>
            </Head>
            <TableBody>
                <TableRow>
                    <Cell align="left"></Cell>
                    <Cell align="center"><ScheduleAddButton onClick={this.toggleModal}>Add A Schedule</ScheduleAddButton></Cell>
                    <Cell align="right"></Cell>
                </TableRow>
                <TableRow>
                    <Cell align="left"></Cell>
                    <Cell align="center">
                        <ScheduleAddButton negative="true" onClick={this.toggleDeleteModal}>
                            {this.props.deletingSchedule ? <LoadingSpinner size="28" /> : 'Delete Schedule'}
                        </ScheduleAddButton>
                    </Cell>
                    <Cell align="right"></Cell>
                </TableRow>
                {/* If we have no plants, we will display the table, with the first and only cell being a message stating that they have no plants, but offering a link for them to add one! If there are plants, we simply map over them to display a table row for each plant! */}
                {this.props.schedule.length < 1 ? <><TableRow><Cell align="left">{''}</Cell><Cell align="center"><h3>You don't have any watering schedules for this plant!</h3><h3><ToggleModalSpan onClick={this.toggleModal}>Add one!</ToggleModalSpan></h3></Cell></TableRow></> :
                    this.props.schedule.filter(s => new Date(s.watering_time).getTime() > Date.now()).sort().map(p => {
                        return  <ScheduleTableCell key={p.id} deleteSingleSchedule={this.props.deleteSingleSchedule} plantId={this.props.plantId} schedule={p} />
                    })
                }
            </TableBody>
        </TableContainer>
        <ScheduleFormModal open={this.state.modalOpen}>
            <ScheduleForm addingSchedule={this.props.addingSchedule} addSchedule={this.props.addSchedule} toggleModal={this.toggleModal} />
        </ScheduleFormModal>
        <ScheduleFormModal open={this.state.deleteModalOpen}>
            <ModalBox>
                <h3>Are You Sure You Want To Delete All Watering Times?</h3>
                <ModalButton no="true"  onClick={this.toggleDeleteModal}>No</ModalButton>
                <ModalButton yes="true" onClick={e => {this.props.deleteSchedule(this.props.plantId); this.toggleDeleteModal();}}>Yes</ModalButton> 
            </ModalBox>
        </ScheduleFormModal>
      </TablePaper>
    )
  }
}

const ModalBox = styled(Paper)`
    && {
        font-size: 1.6rem;
        padding: 12px;
        text-align: center;
    }
`;

const LoadingSpinner = styled(CircularProgress)`
    && {
        height: 28px;
        width: 28px;
        color: white;
    }
`; 

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

const ToggleModalSpan = styled.span`
    color: ${props => props.theme.primaryLight};
    text-decoration: underline;
    transition: .3s all;
    &:hover {
        cursor: pointer;
        color: ${props => props.theme.primary};
    }
`;

const ScheduleAddButton = styled(Button)`
    && {
        text-align: center;
        font-size: 1.6rem;
        width: 75%;
        margin: 4px auto;
        color: white;
        background: ${props => {
            if(props.negative) return props.theme.error;
            return props.theme.primaryLight;
        }};
        &:hover {
            background: ${props => {
                if(props.negative) return props.theme.errorDark;
                return props.theme.primaryDark;
            }}
        }
    }
`;

const ScheduleFormModal = styled(Dialog)`
    && {
        font-size: 1.6rem;
        padding: 12px;
        text-align: center;
    }
`;

const TablePaper = styled(Paper)`
    width: 95%;
    margin: 32px auto;
`;

const TableContainer = styled(Table)`
    && {
        font-size: 1.6rem;
    }
`;

const Head = styled(TableHead)`
    && {
        background: ${props => props.theme.primary};
        th {
            color: white;
        }
    }
`;

const Cell = styled(TableCell)`
    && {
        font-size: 1.6rem;
    }
`;

ScheduleTable.propTypes = {
    addSchedule: PropTypes.func.isRequired,
    addingSchedule: PropTypes.bool.isRequired,
    deleteSchedule: PropTypes.func.isRequired,
    deleteSingleSchedule: PropTypes.func.isRequired,
    deletingSchedule: PropTypes.bool.isRequired,
    plantId: PropTypes.number.isRequired,
    schedule: PropTypes.array.isRequired
}

export default withTheme(ScheduleTable);