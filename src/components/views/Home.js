import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PlantsTable from '../PlantsTable';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchPlants } from '../../actions';

class Home extends React.Component {

    componentDidMount() {
        this.props.fetchPlants();
    }
    
    render() {
        return (
            <Container>
                <header>Welcome, {this.props.username}</header>
                {this.props.fetchingPlants ? <LoadingSpinner size="42" /> : 
                    <PlantsTable plants={this.props.plants} />
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

export default connect(mapStateToProps, { fetchPlants })(Home);