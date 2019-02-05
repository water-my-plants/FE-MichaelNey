import React from 'react';

import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class ScheduleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            passInput: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.setState({
            userInput: '',
            passInput: ''
        });
    }
    
    render() {
        //Causing warning - cannont update during an existing state transition, however it works as intended. No negative side effects.
        if(this.props.loggedIn) {
            this.props.history.push('/');
        }
        
        return (
        <ScheduleFormBox>
            <CloseModalBtn onClick={this.props.toggleModal}><i className="fas fa-times-circle"></i></CloseModalBtn>
            <h1>Add Schedule</h1>
            <Form onSubmit={this.handleSubmit} autoComplete="off">
                <InputContainer variant="filled">
                    <Label htmlFor="userInput">Username</Label>
                    <Input required type="text" name="userInput" value={this.state.userInput} onChange={this.handleInput} />
                </InputContainer>
                <InputContainer variant="filled">
                    <Label htmlFor="passInput">Password</Label>
                    <Input required type="password" name="passInput" value={this.state.passInput} onChange={this.handleInput} />
                </InputContainer>
                {/* If we are logging in, show a loading indicator while waiting for the response. */}
                <ScheduleAddBtn type="submit">{this.props.addingSchedule ? <LoadingSpinner size="28" /> : 'Login'}</ScheduleAddBtn>
            </Form>
        </ScheduleFormBox>
        )
    }
}

const ScheduleFormBox = styled(Card)`
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

const RegisterLink = styled(Link)`
    font-size: 1.4rem;
    text-decoration: underline;
    color: rgba(0, 0, 0, .5);
    margin: 6px auto;
    &:visited {
        color: rgba(0, 0, 0, .5);
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
        font-size: 1.8rem;
        &::after {
            border-bottom: 2px solid ${props => props.theme.primary};
        }
    }
`;

const ScheduleAddBtn = styled(Button)`
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

export default withTheme(ScheduleForm);