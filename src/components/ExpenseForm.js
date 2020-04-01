import React from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Button from 'react-bootstrap/Button';

// we are using state because we can impliment live error checkings
// amount is given as a 'text' not 'number' because, we want to restrict to 2 decimal places.
export class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.expense? props.expense.description:'',
            amount: props.expense? (props.expense.amount).toString():'',
            note: props.expense? props.expense.note:'',
            createdAt: props.expense? moment(props.expense.createdAt):moment(),
            calenderFocused: false,
            errorMsg: ''
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState((state) => {
            return {description: description};
        });
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if(amount.match(/^\d*(\.\d{0,2})?$/)){
            this.setState((state) => {
                return {amount: amount};
            });
        }
    };
    onNotesChange = (e) => {
        const note = e.target.value;
        this.setState((state) => {
            return {note: note};
        });
    };
    onFocusChange = ({ focused }) => {
        this.setState((state) => { return {calenderFocused:focused} });
    };
    handleSubmit = (e) => {
        e.preventDefault(); // To prevent the full page refresh
        if(!this.state.description || !this.state.amount || !this.state.createdAt){
            this.setState((state) => {
                return {errorMsg: 'Please provide Description, Amount and Date'};
            });
        }
        else{
            this.setState((state) => {
                return {errorMsg: ''};
            });
            console.log('Submitted');
            this.props.handleSubmit({   // here we are calling the function by passing an object with necessary info, and function definition is at the place where we are passing the props 
                description: this.state.description,
                amount: parseFloat(this.state.amount,10),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render(){
        return (
            <form className="expenseform" onSubmit={this.handleSubmit}>
                {this.state.errorMsg && <p className="form__error">* {this.state.errorMsg}</p>} 
                <input className="form__text" type="text" value={this.state.description} placeholder='Description' onChange={this.onDescriptionChange} autoFocus/>
                <input className="form__text" type="text" value={this.state.amount} placeholder='Amount' onChange={this.onAmountChange}/>
                <div className="form__date">
                <SingleDatePicker
                    date={this.state.createdAt} // momentPropTypes.momentObj or null
                    onDateChange={createdAt => this.setState({ createdAt })} // PropTypes.func.isRequired
                    focused={this.state.calenderFocused} // PropTypes.bool
                    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
                    id="dateID" // PropTypes.string.isRequired,
                    numberOfMonths={1}
                    isOutsideRange={(day) => { return false }}
                />
                </div>
                <textarea className="form__textarea" type="text" value={this.state.note} placeholder='Notes (Optional)' onChange={this.onNotesChange}/>
                <Button className="box-layout__button form__button" type="submit" variant="flat">Save Expense</Button>
            </form>
        );
    }
}