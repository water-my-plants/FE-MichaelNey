import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker, { } from "react-datepicker";
import '../datepicker.css';
import { Portal } from 'react-overlays'
import PropTypes from 'prop-types';

class ScheduleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minDate: new Date(Date.now()),
            minDateEnd: new Date(Date.now() + 86700000),
            dateInputStart: new Date(Date.now() + 300000),
            dateInputEnd: new Date(Date.now() + 87300000),
            frequency: 86400000
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let waterTimes = this.createWaterTimes();
        this.props.addSchedule(this.props.match.params.id, {times: waterTimes});
    }

    createWaterTimes = () => {
        let startDate = new Date(this.state.dateInputStart).getTime();
        let endDate = new Date(this.state.dateInputEnd).getTime();
        let frequency = this.state.frequency;
        let waterTimes = [];
        let cursorTime = startDate;

        for(let i = cursorTime; i < endDate; i += frequency) {
            waterTimes.push(i);
        }

        let parsedWaterTimes = waterTimes.map(w => {
            return moment(w).format();
        });
        return parsedWaterTimes;
    }

    handleDateStart = date => {
        this.setState({
            dateInputStart: date
        });
    }

    handleDateEnd = date => {
        this.setState({
            dateInputEnd: date
        });
    }
    
    render() {
        return (
        <ScheduleFormBox>
            <CloseModalBtn onClick={this.props.toggleModal}><i className="fas fa-times-circle"></i></CloseModalBtn>
            <h1>Add Schedule</h1>
            <Form onSubmit={this.handleSubmit} autoComplete="off">
            <InputRow>
                <InputContainer variant="filled">
                    <Label htmlFor="dateInputStart">Start Day (First Water)</Label>
                    <DatePicker
                        popperContainer={CalendarContainer}
                        name="dateInputStart"
                        popperPlacement="top"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect
                        timeIntervals={15}
                        minDate={this.state.minDate}
                        selected={this.state.dateInputStart}
                        onChange={this.handleDateStart}
                        customInput={<Input />}
                    />
                </InputContainer>
                <InputContainer variant="filled">
                    <Label htmlFor="dateInputEnd">End Day (Latest Possible Water)</Label>
                    <DatePicker
                        popperContainer={CalendarContainer}
                        name="dateInputEnd"
                        popperPlacement="top"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect
                        timeIntervals={15}
                        minDate={this.state.minDateEnd}
                        selected={this.state.dateInputEnd}
                        onChange={this.handleDateEnd}
                        customInput={<Input />}
                    />
                </InputContainer>
            </InputRow>
                <InputContainer variant="filled">
                    <Label htmlFor="frequency">How Often To Water</Label>
                    <Select
                        value={this.state.frequency}
                        onChange={this.handleInput}
                        input={<Input name="frequency" id="age-helper" />}
                    >
                        <SelectOption value={86400000}>Daily</SelectOption>
                        <SelectOption value={172800000}>Every Other Day</SelectOption>
                    </Select>
                </InputContainer>
            
            {/* If we are logging in, show a loading indicator while waiting for the response. */}
            <ScheduleAddBtn type="submit">{this.props.addingSchedule ? <LoadingSpinner size="28" /> : 'Add To Schedule'}</ScheduleAddBtn>
            </Form>
        </ScheduleFormBox>
        )
    }
}

const CalendarContainer = ({children}) => {
    const el = document.getElementById('calendar-portal')
  
    return (
      <Portal container={el}>
        {children}
      </Portal>
    )
}

const SelectOption = styled(MenuItem)`
    && {
        font-size: 1.6rem;
    }
`;

const InputRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

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

ScheduleForm.propTypes = {
    addSchedule: PropTypes.func.isRequired,
    addingSchedule: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
}

export default withTheme(withRouter(ScheduleForm));