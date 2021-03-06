import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchPlant, fetchSchedule, addSchedule, deleteSchedule, deleteSingleSchedule, updatePlant, addNotifHelper } from '../../actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ScheduleTable from '../ScheduleTable';
import EditPlantForm from '../EditPlantForm';
import ScheduleForm from '../ScheduleForm';
import PropTypes from 'prop-types';

class PlantPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            scheduleModal: false,
            deleteScheduleModal: false
        }
    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                modalOpen: !prevState.modalOpen
            }
        });
    }

    toggleScheduleModal = () => {
        this.setState(prevState => {
            return {
                scheduleModal: !prevState.scheduleModal
            }
        });
    }

    toggleDeleteScheduleModal = () => {
        this.setState(prevState => {
            return {
                deleteScheduleModal: !prevState.deleteScheduleModal
            }
        });
    }

    closeModal = () => {
        this.setState({
            modalOpen: false,
            scheduleModal: false,
            deleteScheduleModal: false
        })
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
                                <EditFormModal onClose={this.closeModal} open={this.state.modalOpen}>
                                    <EditPlantForm plant={this.props.lastFetchedPlant} updatingPlant={this.props.updatingPlant} updatePlant={this.props.updatePlant} toggleModal={this.toggleModal} />
                                </EditFormModal>
                            </PlantInfo>
                            {/* ScheduleTable component handles multiple loading spinners. This many props is neccessary to maintain Container/Presentational component architecture. */}
                            {!this.props.fetchingSchedule && <>
                            <ScheduleButtons>
                                <ScheduleAddButton onClick={this.toggleScheduleModal}>
                                    Add A Schedule
                                </ScheduleAddButton>
                                <ScheduleAddButton negative="true" onClick={this.toggleDeleteScheduleModal}>
                                    {this.props.deletingSchedule ? <LoadingSpinnerSmall size="28" /> : 'Delete Schedule'}
                                </ScheduleAddButton>
                            </ScheduleButtons>
                            <ScheduleTable 
                                plantId={this.props.lastFetchedPlant.id} 
                                addingSchedule={this.props.addingSchedule} 
                                addSchedule={this.props.addSchedule} 
                                schedule={this.props.waterSchedule} 
                                deleteSchedule={this.props.deleteSchedule} 
                                deleteSingleSchedule={this.props.deleteSingleSchedule} 
                                deletingSchedule={this.props.deletingSchedule} 
                                toggleModal={this.toggleScheduleModal}
                            />
                            
                            </> }
                            <ScheduleFormModal onClose={this.closeModal} open={this.state.scheduleModal}>
                                <ScheduleForm addNotifHelper={this.props.addNotifHelper} addingSchedule={this.props.addingSchedule} addSchedule={this.props.addSchedule} toggleModal={this.closeModal} />
                            </ScheduleFormModal>
                            <ScheduleFormModal onClose={this.closeModal} open={this.state.deleteScheduleModal}>
                                <ModalBox>
                                    <h3>Are You Sure You Want To Delete All Watering Times?</h3>
                                    <ModalButton no="true"  onClick={this.closeModal}>No</ModalButton>
                                    <ModalButton yes="true" onClick={e => {this.props.deleteSchedule(this.props.lastFetchedPlant.id); this.closeModal();}}>Delete</ModalButton> 
                                </ModalBox>
                            </ScheduleFormModal>
                        </>
                        
                    }</>
                    
                } 
            </div>
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

const ModalButton = styled(Button)`
    && {
        font-size: 1.6rem;
        width: 45%;
        margin: 4px 4px;
        color: white;
        background: ${props => {
            if(props.yes) return props.theme.error;
            return props.theme.primary;
        }};
        &:hover {
            background: ${props => {
                if(props.yes) return props.theme.errorDark;
                return props.theme.primaryLight;
            }};
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

const EditFormModal = styled(Dialog)`
    && {
        font-size: 1.6rem;
        padding: 12px;
        text-align: center;
        @media (max-width: ${props => props.theme.medium}) {
            max-width: 100%;
            width: 90%;
            margin: 0;
        }
        @media (max-width: ${props => props.theme.small}) {
            width: 98%;
        }
    }
`;

const ScheduleButtons = styled.div`
    display: flex;
    margin: 0 auto;
    margin-top: 32px;
    width: 95%;
    justify-content: space-between;
    padding: 0px;
`;

const ScheduleAddButton = styled(Button)`
    && {
        text-align: center;
        font-size: 1.6rem;
        width: 48%;
        margin: 0px auto;
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

const LoadingSpinnerSmall = styled(CircularProgress)`
    && {
        height: 28px;
        width: 28px;
        color: white;
    }
`; 

PlantPage.propTypes = {
    addSchedule: PropTypes.func.isRequired,
    addingSchedule: PropTypes.bool.isRequired,
    deleteSchedule: PropTypes.func.isRequired,
    deleteSingleSchedule: PropTypes.func.isRequired,
    deletingSchedule: PropTypes.bool.isRequired,
    fetchPlant: PropTypes.func.isRequired,
    fetchSchedule: PropTypes.func.isRequired,
    fetchingPlant: PropTypes.bool.isRequired,
    fetchingSchedule: PropTypes.bool.isRequired,
    addNotifHelper: PropTypes.func.isRequired,
    lastFetchedPlant: PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.number.isRequired,
        last_water: PropTypes.any,
        location: PropTypes.string,
        name: PropTypes.string.isRequired,
        user_id: PropTypes.number.isRequired
    }),
    updatePlant: PropTypes.func.isRequired,
    updatingPlant: PropTypes.bool.isRequired,
    waterSchedule: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        watering_time: PropTypes.string.isRequired
    }))
}

const mapStateToProps = state => {
    return {
        plants: state.plantsReducer.plants,
        fetchingPlant: state.plantsReducer.fetchingPlant,
        updatingPlant: state.plantsReducer.updatingPlant,
        lastFetchedPlant: state.plantsReducer.lastFetchedPlant,
        waterSchedule: state.scheduleReducer.waterSchedule,
        fetchingSchedule: state.scheduleReducer.fetchingSchedule,
        addingSchedule: state.scheduleReducer.addingSchedule,
        deletingSchedule: state.scheduleReducer.deletingSchedule,
    }
}

export default connect(mapStateToProps, { addNotifHelper, fetchPlant, fetchSchedule, addSchedule, deleteSchedule, deleteSingleSchedule, updatePlant })(PlantPage);