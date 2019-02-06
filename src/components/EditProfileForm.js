import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaskedInput from 'react-text-mask';

class EditProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            emailInput: '',
            phoneInput: '',
            formError: ''
        }
    }

    componentDidMount() {
        this.setState({
            userInput: this.props.username,
            emailInput: this.props.email,
            phoneInput: this.props.phone,
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.formValidation(this.state.phoneInput)) return;
        let userObj = {
            username: this.state.userInput,
            email: this.state.emailInput,
            phone: this.state.phoneInput
        }
        this.props.updateUser(this.props.userId, userObj);
    }

    clearFormError = () => {
        this.setState({
            formError: ''
        });
    }

    formValidation = (phone) => {
        //check if phone number matches E.164 phone number format - To match Twilio API phone number specifications.
        let phoneRegex = RegExp(/^\+?[1-9]\d{1,14}$/);
        if(phoneRegex.test(phone) === false) {
            this.setState({
                formError: 'Phone number must include country code. Example US number: +13609554732'
            })
            return false;
        }
        return true;
    }

    render() {
        
        return (
        <EditProfileFormBox>
            <CloseModalBtn onClick={this.props.toggleModal}><i className="fas fa-times-circle"></i></CloseModalBtn>
            <h1>Edit Profile</h1>
            <Form onSubmit={this.handleSubmit} autoComplete="off">
                <InputContainer variant="filled">
                    <Label htmlFor="userInput">Username</Label>
                    <Input required type="text" name="userInput" value={this.state.userInput} onChange={this.handleInput} />
                </InputContainer>
                <InputContainer variant="filled">
                    <Label htmlFor="emailInput">Email</Label>
                    <Input required type="email" name="emailInput" value={this.state.emailInput} onChange={this.handleInput} />
                </InputContainer>
                <InputContainer variant="filled">
                    <Label htmlFor="phoneInput">Phone</Label>
                    <Input required type="tel" name="phoneInput" value={this.state.phoneInput} onChange={this.handleInput} inputComponent={PhoneInput} />
                    <HelperText>Phone number must include country code. Example US number: +13609554732</HelperText>
                </InputContainer>
                {this.state.formError !== '' && <FormError onClick={this.clearFormError}>{this.state.formError}</FormError>}
                {/* If we are logging in, show a loading indicator while waiting for the response. */}
                <EditBtn type="submit">{this.props.updatingUser ? <LoadingSpinner size="28" /> : 'Edit Profile'}</EditBtn>
            </Form>
        </EditProfileFormBox>
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


const HelperText = styled.p`
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


const EditProfileFormBox = styled(Card)`
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

export default withTheme(withRouter(EditProfileForm));