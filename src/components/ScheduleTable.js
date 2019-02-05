import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ScheduleTableCell from './ScheduleTableCell';

class ScheduleTable extends React.Component {
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
                {/* If we have no plants, we will display the table, with the first and only cell being a message stating that they have no plants, but offering a link for them to add one! If there are plants, we simply map over them to display a table row for each plant! */}
                {this.props.plants.length < 1 ? <><TableRow><Cell align="left">{''}</Cell><Cell align="center"><h3>You don't have any watering schedules for this plant!</h3></Cell><Cell align="center"><h3><Link to="/plants/add">Add one!</Link></h3></Cell></TableRow></> :
                    this.props.plants.map(p => {
                        return  <ScheduleTableCell deleteSchedule={this.props.deleteSchedule} key={p.id} plant={p} />
                    })
                }
            </TableBody>
        </TableContainer>
      </TablePaper>
    )
  }
}

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