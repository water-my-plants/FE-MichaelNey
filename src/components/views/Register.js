import React from 'react';

import { connect } from 'react-redux';
import { userRegister } from '../../actions';

import MaskedInput from 'react-text-mask';
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            emailInput: '',
            phoneInput: '',
            passInput: '',
            confirmPassInput: '',
            formError: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    formValidation = (phone) => {
        if(this.state.passInput !== this.state.confirmPassInput) {
            this.setState({
                formError: 'Passwords do not match!'
            });
            return false;
        }

        //check if phone number matches E.164 phone number format - To match Twilio API phone number specifications.
        let phoneRegex = RegExp(/^\+?[1-9]\d{1,14}$/);
        console.log(phoneRegex.test(phone))
        if(phoneRegex.test(phone) === false) {
            this.setState({
                formError: 'Phone number must include country code. Example US number: +13609554732'
            })
            return false;
        }
        return true;
    }

    clearFormError = () => {
        this.setState({
            formError: ''
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // If formValidation fails, it will return false. If so, don't submit form.
        if(!this.formValidation(this.state.phoneInput)) return;
        let username = this.state.userInput;
        let email = this.state.emailInput;
        let phone = this.state.phoneInput;
        let password = this.state.passInput;
        this.props.userRegister(username, email, phone, password);
        this.setState({
            userInput: '',
            emailInput: '',
            phoneInput: '',
            passInput: '',
            confirmPassInput: ''
        });
    }
    
    render() {
        if(this.props.loggedIn) {
            this.props.history.push('/');
        }
        return (
            <div>
                <LoginBox>
                    <h1>Register</h1>
                    <Form onSubmit={this.handleSubmit} autoComplete="off">
                        <InputContainer variant="filled">
                            <Label htmlFor="userInput">Username *</Label>
                            <Input required type="text" name="userInput" value={this.state.userInput} onChange={this.handleInput} />
                        </InputContainer>
                        <InputContainer variant="filled">
                            <Label htmlFor="emailInput">Email *</Label>
                            <Input required type="email" name="emailInput" value={this.state.emailInput} onChange={this.handleInput} />
                        </InputContainer>
                        <InputContainer variant="filled">
                            <Label htmlFor="phoneInput">Phone *</Label>
                            <Input required type="tel" name="phoneInput" value={this.state.phoneInput} onChange={this.handleInput} inputComponent={PhoneInput} />
                            <PhoneHelperText>Phone number must include country code. Example US number: +13609554732</PhoneHelperText>
                        </InputContainer>
                        <InputContainer variant="filled">
                            <Label htmlFor="passInput">Password *</Label>
                            <Input required type="password" name="passInput" value={this.state.passInput} onChange={this.handleInput} />
                        </InputContainer>
                        <InputContainer variant="filled">
                            <Label htmlFor="confirmPassInput">Confirm Password *</Label>
                            <Input required type="password" name="confirmPassInput" value={this.state.confirmPassInput} onChange={this.handleInput} />
                            {/* Do we have an error in the form? Display it to the user! */}
                            {this.state.formError !== '' && <FormError onClick={this.clearFormError}>{this.state.formError}</FormError>}
                        </InputContainer>
                        
                        {/* If we are logging in, show a loading indicator while waiting for the response. */}
                        <RegisterBtn type="submit">{this.props.registering ? <LoadingSpinner size="28" /> : 'Register'}</RegisterBtn>
                        <LoginLink to="/login">Already have an account? Log in Here!</LoginLink>
                    </Form>
                </LoginBox>
            </div>
        )
    }
}

const PhoneInput = (props) => {
    const { inputRef, ...other } = props;
    //This component is used in our Phone input, to keep  E.164 Phone Number format compliance for our Twilio API.
    return (
        <MaskedInput
            {...other}
            guide={false}
            ref={ref => {
            inputRef(ref ? ref.inputElement : null);
            }}
            mask={['+', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        />
    )
}

const PhoneHelperText = styled.p`
    font-size: 1.4rem;
    text-decoration: none;
    color: rgba(0, 0, 0, .5);
    margin: 0 auto;
    padding-top: 6px;
`;

const FormError = styled.div`
    position: relative;
    border: 1px solid ${props => props.theme.error};
    background: ${props => props.theme.error};
    color: white;
    font-size: 1.6rem;
    border-radius: 4px;
    padding: 4px;
    width: 100%;
    margin-top: 12px;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
`;

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

const HelperText = styled.p`
    font-size: 1.4rem;
    text-decoration: none;
    color: rgba(0, 0, 0, .5);
    margin: 0 auto;
    padding-top: 6px;
`;

const LoginLink = styled(Link)`
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

const RegisterBtn = styled(Button)`
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

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        registering: state.userReducer.registering,
        registered: state.userReducer.registered
    }
};

export default connect(mapStateToProps, { userRegister })(withTheme(Register));