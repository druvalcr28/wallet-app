import React from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

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
            <div>
            {this.state.errorMsg && <p>{this.state.errorMsg}</p>} 
            <form onSubmit={this.handleSubmit}>
                <label>
                    Description -
                    <input type="text" value={this.state.description} placeholder='Description' onChange={this.onDescriptionChange} autoFocus/>
                </label>
                <br></br>
                <label>
                    Amount -
                    <input type="text" value={this.state.amount} placeholder='Amount' onChange={this.onAmountChange}/>
                </label>
                <br></br>
                <label>
                    Date -
                    <SingleDatePicker
                    date={this.state.createdAt} // momentPropTypes.momentObj or null
                    onDateChange={createdAt => this.setState({ createdAt })} // PropTypes.func.isRequired
                    focused={this.state.calenderFocused} // PropTypes.bool
                    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
                    id="dateID" // PropTypes.string.isRequired,
                    numberOfMonths={1}
                    isOutsideRange={(day) => { return false }}
                    />
                </label>
                <br></br>
                <label>
                    Notes -
                    <textarea type="text" value={this.state.note} placeholder='Notes' onChange={this.onNotesChange}/>
                </label>
                <br></br>
                <button>Add Expense</button>
            </form>
            </div>
        );
    }
}