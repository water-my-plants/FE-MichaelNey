import React from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PlantTableCell from './PlantTableCell';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

class PlantsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: [],
            visiblePlants: [],
            offset: 0,
            pageCount: 0,
        }
    }

    componentDidMount() {
        let pageCount = Math.ceil(this.props.plants.length / 10);
        this.setState({
            plants: this.props.plants,
            visiblePlants: this.props.plants.slice(0, 10),
            pageCount: pageCount
        })
    }

    componentDidUpdate(prevProps) {
        if(JSON.stringify(prevProps.plants) !== JSON.stringify(this.props.plants)) {
            let pageCount = Math.ceil(this.props.plants.length / 10);
            this.setState({
                plants: this.props.plants,
                pageCount: pageCount,
                visiblePlants: this.props.plants.slice(this.state.offset, this.state.offset + 10)
            })
        }
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 10);
        let visiblePlants = this.state.plants.slice(offset, offset + 10);
        this.setState({ offset: offset, visiblePlants });
    };

    render() {
        console.log(this.state);
        return (
        <TablePaper>
            <TableContainer>
                <Head>
                    <TableRow>
                        <Cell align="left">Plant</Cell>
                        <Cell align="center">Location</Cell>
                        <Cell align="center">Description</Cell>
                        <Cell align="right">Actions</Cell>
                    </TableRow>
                </Head>
                <TableBody>
                    {/* If we have no plants, we will display the table, with the first and only cell being a message stating that they have no plants, but offering a link for them to add one! If there are plants, we simply map over them to display a table row for each plant! */}
                    {this.state.visiblePlants.length < 1 ? <><TableRow><Cell align="left">{''}</Cell><Cell align="center"><h3>You don't have any plants!</h3></Cell><Cell align="center"><h3><Link to="/plants/add">Add one!</Link></h3></Cell></TableRow></> :
                        this.state.visiblePlants.map(p => {
                            return  <PlantTableCell deletePlant={this.props.deletePlant} key={p.id} plant={p} />
                        })
                    }
                </TableBody>
            </TableContainer>
            {/* If we don't have any plants, don't show pagination. */}
            {this.state.visiblePlants.length < 1 ? null :
                <PaginationContainer>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </PaginationContainer>
            }
        </TablePaper>
        )
    }
}

const PaginationContainer = styled.div`
    /* Customizing Bootstrap Styles + Minor Custom Styles */
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 1.6rem;
    .pagination {
        display: flex;
        width: 100%;
        list-style-type: none;
        justify-content: center;
        padding: 0;
    }

    .pagination>li>a, .pagination>li>span {
        color: ${props => props.theme.primary};
    }

    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
        background: ${props => props.theme.primary};
        color: white;
        outline: none;
    }

    .pagination>li>a {
        border: 1px solid ${props => props.theme.primary};
        &:focus {
            outline: none;
        }
    }

    .pagination>.disabled>a, .pagination>.disabled>a:focus, .pagination>.disabled>a:hover, .pagination>.disabled>span, .pagination>.disabled>span:focus, .pagination>.disabled>span:hover {
        border: 1px solid ${props => props.theme.primary};
    }
`;

const TablePaper = styled(Paper)`
    width: 95%;
    margin: 32px auto;
    margin-bottom: 46px;
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
        font-size: 2rem;
        @media (max-width: ${props => props.theme.tableBreakPoint}) {
            display: block;
            width: 100%;
            text-align: center;
            padding: 6px;
            &:last-of-type {
                padding-right: 6px;
            }
        }
    }
`;

PlantsTable.propTypes = {
    deletePlant: PropTypes.func.isRequired,
    plants: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.number.isRequired,
        last_water: PropTypes.any,
        location: PropTypes.string,
        name: PropTypes.string.isRequired,
        user_id: PropTypes.number.isRequired
    }))
}

export default withTheme(PlantsTable);
