import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PlantsTable from '../PlantsTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchPlants, deletePlant } from '../../actions';
import PropTypes from 'prop-types';

class Home extends React.Component {

    componentDidMount() {
        this.props.fetchPlants();
    }
    
    render() {
        return (
            <Container>
                <header>Welcome, {this.props.username}</header>
                {this.props.fetchingPlants ? <LoadingSpinner size="42" /> : 
                    <PlantsTable deletePlant={this.props.deletePlant} plants={this.props.plants} />
                }
            </Container>
        )
    }
}

const Container = styled.div`
    text-align: center;

    header {
        font-size: 36px;
    }
`;

const LoadingSpinner = styled(CircularProgress)`
    && {
        height: 42px;
        width: 42px;
        color: ${props => props.theme.primaryDark};
    }
`; 

const mapStateToProps = state => {
    return {
        username: state.userReducer.username,
        fetchingPlants: state.plantsReducer.fetchingPlants,
        plants: state.plantsReducer.plants
    }
}

Home.propTypes = {
    deletePlant: PropTypes.func.isRequired,
    fetchPlants: PropTypes.func.isRequired,
    fetchingPlants: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    plants: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.number.isRequired,
        last_water: PropTypes.any,
        location: PropTypes.string,
        name: PropTypes.string.isRequired,
        user_id: PropTypes.number.isRequired
    })).isRequired
}

export default connect(mapStateToProps, { fetchPlants, deletePlant })(Home);