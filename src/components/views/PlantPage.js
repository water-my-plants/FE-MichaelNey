import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchPlant, fetchSchedule, addSchedule, deleteSchedule, updatePlant } from '../../actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ScheduleTable from '../ScheduleTable';
import EditPlantForm from '../EditPlantForm';


class PlantPage extends React.Component {
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
                        <>
                            <PlantInfo>
                                <ErrorHeader>Plant Doesn't Exist</ErrorHeader>
                            </PlantInfo>
                        </>
                        :
                        <>
                            <PlantInfo>
                                <h1>{this.props.lastFetchedPlant.name}</h1>
                                <p><strong>location:</strong> {this.props.lastFetchedPlant.location ? `${this.props.lastFetchedPlant.location}` : <LightText>N/A</LightText>}</p>
                                <p><strong>Description:</strong> {this.props.lastFetchedPlant.description ? `${this.props.lastFetchedPlant.description}` : <LightText>N/A</LightText>}</p>
                                <ModalButton onClick={this.toggleModal}>Edit Plant</ModalButton>
                                <EditFormModal open={this.state.modalOpen}>
                                    <EditPlantForm plant={this.props.lastFetchedPlant} updatingPlant={this.props.updatingPlant} updatePlant={this.props.updatePlant} toggleModal={this.toggleModal} />
                                </EditFormModal>
                            </PlantInfo>
                            {!this.props.fetchingSchedule && <ScheduleTable plantId={this.props.lastFetchedPlant.id} addingSchedule={this.props.addingSchedule} addSchedule={this.props.addSchedule} schedule={this.props.waterSchedule} deleteSchedule={this.props.deleteSchedule} /> }
                        </>
                    }</>
                    
                } 
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
        fetchingSchedule: state.scheduleReducer.fetchingSchedule,
        addingSchedule: state.scheduleReducer.addingSchedule,
    }
}

export default connect(mapStateToProps, { fetchPlant, fetchSchedule, addSchedule, deleteSchedule, updatePlant })(PlantPage);