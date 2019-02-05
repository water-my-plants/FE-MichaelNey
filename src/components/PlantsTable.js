import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class PlantsTable extends React.Component {
  render() {

    return (
      <TablePaper>
        <TableContainer>
            <Head>
                <TableRow>
                    <Cell align="left">Plant</Cell>
                    <Cell align="center">Description</Cell>
                    <Cell align="right">Next Water</Cell>
                </TableRow>
            </Head>
            <TableBody>
                {/* If we have no plants, we will display the table, with the first and only cell being a message stating that they have no plants, but offering a link for them to add one! If there are plants, we simply map over them to display a table row for each plant! */}
                {this.props.plants.length < 1 ? <><TableRow><Cell align="left">{''}</Cell><Cell align="center"><h3>You don't have any plants! <Link to="/plants/add">Add one!</Link></h3></Cell></TableRow></> :
                    this.props.plants.map(p => {
                        return  <TableRow>
                                    <Cell align="left">{p.name}</Cell>
                                    <Cell align="center">{p.description}</Cell>
                                    <Cell align="right">{p.next_water}</Cell>
                                </TableRow> 
                    })
                }
                 {/* <TableRow>
                    <Cell align="left">Roses</Cell>
                    <Cell align="center">My White roses under the sky light.</Cell>
                    <Cell align="right">4 Hours</Cell>
                </TableRow> 
                {this.props.plants.map(p => {
                    return <TableRow>
                                <Cell align="left">Roses</Cell>
                                <Cell align="center">My White roses under the sky light.</Cell>
                                <Cell align="right">4 Hours</Cell>
                            </TableRow>
                })}  */}
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


export default withTheme(PlantsTable);
