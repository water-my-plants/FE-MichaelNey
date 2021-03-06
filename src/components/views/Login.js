import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../actions';
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            passInput: ''
        }
    }

    componentDidMount() {
        if(this.props.loggedIn) {
            this.props.history.push('/');
        }
    }

    componentDidUpdate() {
        if(this.props.loggedIn) {
            this.props.history.push('/');
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let username = this.state.userInput;
        let password = this.state.passInput
        this.props.userLogin(username, password);
        this.setState({
            userInput: '',
            passInput: ''
        });
    }
    
    render() {
        return (
            <div>
                <LoginBox>
                    <h1>Login</h1>
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
                        <LoginBtn type="submit">{this.props.loggingIn ? <LoadingSpinner size="28" /> : 'Login'}</LoginBtn>
                        <RegisterLink to="/register">Don't have an account? Sign Up Here!</RegisterLink>
                    </Form>
                </LoginBox>
            </div>
        )
    }
}

const LoginBox = styled(Card)`
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

const LoadingSpinner = styled(CircularProgress)`
    && {
        height: 28px;
        width: 28px;
        color: white;
    }
`; 

Login.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    userLogin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        loggingIn: state.userReducer.loggingIn
    }
};

export default connect(mapStateToProps, { userLogin })(withTheme(Login));