import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
class EditPlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput: '',
            locationInput: '',
            descriptionInput: ''
        }
    }

    componentDidMount() {
        this.setState({
            nameInput: this.props.plant.name || '',
            locationInput: this.props.plant.location || '',
            descriptionInput: this.props.plant.description || ''
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let plantObj = {
            name: this.state.nameInput,
            location: this.state.locationInput,
            description: this.state.descriptionInput
        };
        this.props.updatePlant(this.props.plant.id, plantObj);
        
    }

    render() {
        return (
        <EditPlantFormBox>
            <CloseModalBtn onClick={this.props.toggleModal}><i className="fas fa-times-circle"></i></CloseModalBtn>
            <h1>Edit Plant</h1>
            <Form onSubmit={this.handleSubmit} autoComplete="off">
                <InputContainer variant="filled">
                    <Label htmlFor="nameInput">Name *</Label>
                    <Input required type="text" name="nameInput" value={this.state.nameInput} onChange={this.handleInput} />
                </InputContainer>
                <InputContainer variant="filled">
                    <Label htmlFor="locationInput">Location</Label>
                    <Input type="text" name="locationInput" value={this.state.locationInput} onChange={this.handleInput} />
                </InputContainer>
                <InputContainer variant="filled">
                    <Label htmlFor="descriptionInput">Description</Label>
                    <Input type="text" name="descriptionInput" value={this.state.descriptionInput} onChange={this.handleInput} />
                </InputContainer>
                {/* If we are logging in, show a loading indicator while waiting for the response. */}
                <EditBtn type="submit">{this.props.updatingPlant ? <LoadingSpinner size="28" /> : 'Update'}</EditBtn>
            </Form>
        </EditPlantFormBox>
        )
    }
}

const EditBtn = styled(Button)`
    && {
        font-size: 1.6rem;
        width: 98%;
        margin: 4px auto;
        color: white;
        background: ${props => props.theme.primary};
        &:hover {
            background: ${props => props.theme.primaryLight};
        }
    }
`;


const EditPlantFormBox = styled(Card)`
    position: relative;
    width: 600px;
    margin: 0 auto;
    font-size: 1.6rem;

    h1 {
        text-align: center;
        width: 100%;
        color: ${props => props.theme.primary};
    }

    

    @media (max-width: ${props => props.theme.small}) {
        width: 98%;
    }
`;

const CloseModalBtn = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    color: ${props => props.theme.error};
    padding: 8px;
    font-size: 2rem;
    transition: .3s all;
    &:hover {
        color: ${props => props.theme.errorLight};
        cursor: pointer;
    }
`;

const Label = styled(InputLabel)`
    &&& { /* &&& is needed to be more specific than Material UI classes. */
        font-size: 1.6rem;
        color: ${props => props.theme.primary};
    } 
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const InputContainer = styled(FormControl)`
    &&{
        font-size: 1.6rem;
        width: 100%;
        margin: 0 auto;
        padding: 6px;
    }
    
`;

const Input = styled(FilledInput)`
    && {
        width: 99%;
        font-size: 1.8rem;
        &::after {
            border-bottom: 2px solid ${props => props.theme.primary};
        }
    }
`;

const LoadingSpinner = styled(CircularProgress)`
    && {
        height: 28px;
        width: 28px;
        color: white;
    }
`; 

EditPlantForm.propTypes = {
    plant: PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.number.isRequired,
        last_water: PropTypes.any,
        location: PropTypes.string,
        name: PropTypes.string.isRequired,
        user_id: PropTypes.number.isRequired
    }).isRequired,
    toggleModal: PropTypes.func.isRequired,
    updatePlant: PropTypes.func.isRequired,
    updatingPlant: PropTypes.bool.isRequired
}

export default withTheme(withRouter(EditPlantForm));