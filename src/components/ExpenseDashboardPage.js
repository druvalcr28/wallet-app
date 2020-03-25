import React from 'react';
import { connect } from 'react-redux';
import reorderExpenses from '../selectors/expenses';
import { setTextFilter,sortByDate,sortByAmount,setStartDate,setEndDate } from '../actions/filters';
import { removeExpense } from '../actions/expenses';
import { Link } from 'react-router-dom';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

// Individual Expense
// if we use a const ExpenseListItem instead of class, we can't make use of any states, depending on the needs we can use both
class ExpenseListItem extends React.Component{
    render(){
    const id = this.props.details.id;
    return (
    <div>
        <Link to={ `/edit/${id}` }>
            <h3>{this.props.details.description}</h3>
        </Link>
        <p>{this.props.details.amount} - {moment(this.props.details.createdAt).format('MMMM Do YYYY')}</p>
        <button onClick={() => {
            this.props.dispatch(removeExpense({id:this.props.details.id}));
        }}>Remove</button>
    </div>
    );
    }
};
const ConnectedExpenseListItem = connect()(ExpenseListItem);    // note that here we don't need any state, we just need to use dispatch() to the store

// Expense Filters
class ExpenseListFilter extends React.Component {  // here we can also use the implicit syntax of returning jsx
    constructor(props){
        super(props);
        this.state = {
            calenderFocused: "startDate"
        };
    }
    onFocusChange = (calenderFocused) => {
        this.setState((state) => {
            return {calenderFocused:calenderFocused}
        });
    }
    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate({startDate:startDate}));
        this.props.dispatch(setEndDate({endDate:endDate}));
    }
    render(){
    return (
    <div>
        <input type="text" value={this.props.filters.text} onChange={(e) => {
            this.props.dispatch(setTextFilter({text:e.target.value}));
        }}/>
        <select value={this.props.filters.sortBy} onChange={(e) => {
            if(e.target.value === 'amount') this.props.dispatch(sortByAmount());
            else this.props.dispatch(sortByDate());
        }}>
            <option value='amount'>Amount</option>
            <option value='date'>Date</option>
        </select>
        <DateRangePicker
            startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
            startDateId="start_date_id" // PropTypes.string.isRequired,
            endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
            endDateId="end_date_id" // PropTypes.string.isRequired,
            onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
            focusedInput={this.state.calenderFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={(day) => { return false }}
        />
    </div>
    );
    }
};
const mapStatetoProps_ELF = (state) => {
    return {
        filters: state.filters
    };
}
const ConnectedExpenseListFilter = connect(mapStatetoProps_ELF)(ExpenseListFilter);

// Expense Listing
const ExpenseList = (props) => (
    <div>
       <ul>
            {props.expenses.map(expense => {
                return <ConnectedExpenseListItem key={expense.id} details={expense}/>;
            })}
       </ul>
    </div>
);
const mapStatetoProps_EL = (state) => {
    return {
        expenses: reorderExpenses(state.expenses,state.filters)
    };
}
const ConnectedExpenseList = connect(mapStatetoProps_EL)(ExpenseList);

// Main DashBoard
export const ExpenseDashboardPage = () => (
    <div>
        Expense DashBoard
        <ConnectedExpenseListFilter />
        <ConnectedExpenseList />
    </div>
);