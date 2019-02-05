import React from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from "react-datepicker";
import '../../datepicker.css';


class PlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput: '',
            characteristicsInput: '',
            descInput: '',
            dateInput: new Date()
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDate = date => {
        this.setState({
            dateInput: date
        });
    }

    render() {

        return(
            <div>
                <PlantBox>
                    <h1>New Plant</h1>
                    <Form onSubmit={this.handleSubmit} autoComplete="off">
                    <InputContainer variant="filled">
                        <Label htmlFor="nameInput">Plant Name</Label>
                        <Input required type="text" name="nameInput" value={this.state.nameInput} onChange={this.handleInput} />
                    </InputContainer>
                    <InputContainer variant="filled">
                        <Label htmlFor="characteristicsInput">Characteristics</Label>
                        <Input type="text" name="characteristicsInput" value={this.state.characteristicsInput} onChange={this.handleInput} />
                    </InputContainer>
                    <InputContainer variant="filled">
                        <Label htmlFor="descInput">Description</Label>
                        <Input type="text" name="descInput" value={this.state.descInput} onChange={this.handleInput} />
                    </InputContainer>
                    <InputContainer variant="filled">
                    <Label htmlFor="descInput">Water Date</Label>
                    <DateInput
                        name="dateInput"
                        popperPlacement="top"
                        dateFormat="YYYY-MM-dd"
                        selected={this.state.dateInput}
                        onChange={this.handleDate}
                        customInput={<Input />}
                    />
                    </InputContainer>
                    </Form>
                </PlantBox>

            </div>
        )
    }
}

const DateInput = styled(DatePicker)`
    &&&& {
        font-size: 1.6rem;
        display: flex;
        width: 100%;
        div input {
            width: 100%;
        }
    }
    
`;

const PlantBox = styled(Card)`
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
        width: 100%;
        font-size: 1.8rem;
        &::after {
            border-bottom: 2px solid ${props => props.theme.primary};
        }
    }
`;

const SubmitButton = styled(Button)`
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

const LoadingSpinner = styled(CircularProgress)`
    && {
        height: 28px;
        width: 28px;
        color: white;
    }
`; 

export default connect(null, { })(withTheme(PlantForm));