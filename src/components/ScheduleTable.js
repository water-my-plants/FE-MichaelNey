import React from 'react';
import styled, { withTheme } from 'styled-components';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ScheduleTableCell from './ScheduleTableCell';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

class ScheduleTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            deleteModalOpen: false,
            schedule: [],
            visibleSchedule: [],
            offset: 0,
            pageCount: 0
        }
    }

    componentDidMount() {
        let pageCount = Math.ceil(this.props.schedule.length / 10);
        this.setState({
            schedule: this.props.schedule,
            visibleSchedule: this.props.schedule.slice(0, 10),
            pageCount: pageCount
        })
    }

    componentDidUpdate(prevProps) {
        if(JSON.stringify(prevProps.schedule) !== JSON.stringify(this.props.schedule)) {
            let pageCount = Math.ceil(this.props.schedule.length / 10);
            this.setState({
                schedule: this.props.schedule,
                pageCount: pageCount,
                visibleSchedule: this.props.schedule.slice(this.state.offset, this.state.offset + 10)
            })
        }
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 10);
        let visibleSchedule = this.state.schedule.slice(offset, offset + 10);
        this.setState({ offset: offset, visibleSchedule });
    };

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

    closeDeleteModal = () => {
        this.setState({
            deleteModalOpen: false
        })
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
                    <Cell className="hide-on-mobile" align="center">Distance</Cell>
                    <Cell align="right">Actions</Cell>
                </TableRow>
            </Head>
            <TableBody>
                {/* If we have no watering schedules that haven't passed yet, we will display the table, with the first and only cell being a message stating that they have no watering schedules, but offering a link for them to add one! If there are watering schedules, we simply map over them to display a table row for each watering schedules! */}
                {this.state.visibleSchedule.length < 1 ? <><TableRow><Cell align="left">{''}</Cell><Cell align="center"><h3>You don't have any watering schedules for this plant!</h3><h3><ToggleModalSpan onClick={this.props.toggleModal}>Add one!</ToggleModalSpan></h3></Cell></TableRow></> :
                    this.state.visibleSchedule.map(p => {
                        return  <ScheduleTableCell key={p.id} deleteSingleSchedule={this.props.deleteSingleSchedule} plantId={this.props.plantId} schedule={p} />
                    })
                }
            </TableBody>
        </TableContainer>
        {this.state.visibleSchedule.length < 1 ? null :
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

const ToggleModalSpan = styled.span`
    color: ${props => props.theme.primaryLight};
    text-decoration: underline;
    transition: .3s all;
    &:hover {
        cursor: pointer;
        color: ${props => props.theme.primary};
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
        width: 33%;
        @media (max-width: ${props => props.theme.tableBreakPoint}) {
            display: block;
            width: 100%;
            text-align: center;
            padding: 6px;
            border-bottom: ${props => {
                if(props.noborder) return 'none';
                return '1px solid rgba(224, 224, 224, 1)';
            }};
            &:last-of-type {
                padding-right: 6px;
            }
            &.hide-on-mobile {
                display: none;
            }
        }
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