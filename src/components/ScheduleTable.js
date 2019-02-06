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
class ScheduleTable extends React.Component {

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

                </TableRow>
                {/* If we have no plants, we will display the table, with the first and only cell being a message stating that they have no plants, but offering a link for them to add one! If there are plants, we simply map over them to display a table row for each plant! */}
                {this.props.schedule.length < 1 ? <><TableRow><Cell align="left">{''}</Cell><Cell align="center"><h3>You don't have any watering schedules for this plant!</h3><h3><ToggleModalSpan onClick={this.toggleModal}>Add one!</ToggleModalSpan></h3></Cell></TableRow></> :
                    this.props.schedule.filter(s => new Date(s).getTime() > Date.now()).sort().map(p => {
                        return  <ScheduleTableCell key={p} time={p} /> //deleteSchedule={this.props.deleteSchedule}
                    })
                }
            </TableBody>
        </TableContainer>
        <ScheduleFormModal open={this.state.modalOpen}>
            <ScheduleForm addingSchedule={this.props.addingSchedule} addSchedule={this.props.addSchedule} toggleModal={this.toggleModal} />
        </ScheduleFormModal>
      </TablePaper>
    )
  }
}

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
        background: ${props => props.theme.primaryLight};
        &:hover {
            background: ${props => props.theme.primary};
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


export default withTheme(ScheduleTable);