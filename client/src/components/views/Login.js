import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            passInput: ''
        }
    }
    
    render() {
        console.log(this.props);
        return (
            <div>
                <LoginBox>
                    <h1>Login</h1>
                    <Form autoComplete="off">
                        <InputContainer variant="filled">
                            <Label htmlFor="userInput">Name</Label>
                            <Input type="text" name="userInput" value={this.state.name} onChange={this.handleChange} />
                        </InputContainer>
                        <InputContainer variant="filled">
                            <Label htmlFor="passInput">Password</Label>
                            <Input type="password" name="passInput" value={this.state.name} onChange={this.handleChange} />
                        </InputContainer>
                        <LoginBtn>Login</LoginBtn>
                        <RegisterLink to="/register">Don't have an account? Sign Up Here!</RegisterLink>
                    </Form>
                </LoginBox>
            </div>
        )
    }
}

const LoginBox = styled(Card)`
    width: 600px;
    margin: 0 auto;
    font-size: 1.6rem;
    padding: 12px;

    h1 {
        text-align: center;
        width: 100%;
        color: ${props => props.theme.primary};
    }

    @media (max-width: ${props => props.theme.small}) {
        width: 98%;
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

const LoginBtn = styled(Button)`
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

export default withTheme(Login);