import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchPlant, fetchSchedule } from '../../actions';

import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ScheduleTable from '../ScheduleTable';


class PlantPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateInput: new Date(Date.now() + 99999999)
        }
    }

    componentDidMount() {
        this.props.fetchPlant(this.props.match.params.id);
        this.props.fetchSchedule(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                {/* If we are fetching the plant, show loading indicator. */}
                {this.props.fetchingPlant || this.props.lastFetchedPlant === null ? <LoadingContainer><LoadingSpinner size="42" /></LoadingContainer> :
                // If we have fetched the plant, or it has errored, display respective elements.
                    <>{this.props.lastFetchedPlant === 'error' ? 
                    <PlantInfo>
                        <ErrorHeader>Plant Doesn't Exist</ErrorHeader>
                    </PlantInfo> 
                    :
                    <PlantInfo>
                        <h1>Plant Information</h1>
                        <p><strong>Name:</strong> {this.props.lastFetchedPlant.name}</p>
                        <p><strong>Characteristics:</strong> {this.props.lastFetchedPlant.characteristics ? `${this.props.lastFetchedPlant.characteristics}` : <LightText>N/A</LightText>}</p>
                        <p><strong>Description:</strong> {this.props.lastFetchedPlant.description ? `${this.props.lastFetchedPlant.description}` : <LightText>N/A</LightText>}</p>
                    </PlantInfo>
                    }</>
                }
                {!this.props.fetchingSchedule && <ScheduleTable schedule={this.props.waterSchedule} /> }
                
            </div>
        )
    }
}

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

const ErrorHeader = styled.h1`
    && {
        text-align: center;
        width: 100%;
    }
`;

const LightText = styled.span`
    color: rgba(0, 0, 0, .25);
`;

const LoadingContainer = styled.div`
    margin: 0 auto;
    width: 400px;
    height: 400px;
    background: ${props => props.theme.backgroundLight};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingSpinner = styled(CircularProgress)`
    && {
        height: 42px;
        width: 42px;
        color: white;
    }
`; 

const mapStateToProps = state => {
    return {
        plants: state.plantsReducer.plants,
        fetchingPlant: state.plantsReducer.fetchingPlant,
        lastFetchedPlant: state.plantsReducer.lastFetchedPlant,
        waterSchedule: state.scheduleReducer.waterSchedule,
        fetchingSchedule: state.scheduleReducer.fetchingSchedule
    }
}

export default connect(mapStateToProps, { fetchPlant, fetchSchedule })(PlantPage);