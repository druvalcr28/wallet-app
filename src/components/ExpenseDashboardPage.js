import React from 'react';
import { connect } from 'react-redux';
import reorderExpenses from '../selectors/expenses';
import getTotAmount from '../selectors/getTotAmount';
import { setTextFilter,sortByDate,sortByAmount,setStartDate,setEndDate,setCategory } from '../actions/filters';
import { Link } from 'react-router-dom';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// Individual Expense
// if we use a const ExpenseListItem instead of class, we can't make use of any states, depending on the needs we can use both
class ExpenseListItem extends React.Component{
    render(){
    //console.log('ExpenseListItem :',this.props.details);    
    const id = this.props.details.id;
    return (
        <Link className="list-item" to={ `/edit/${id}` } style={{ textDecoration: 'none' }}>
            <div>
                <h3 className="list-item__title">{this.props.details.description}</h3>
                <span className="list-item__subtitle">{moment(this.props.details.createdAt).format('MMMM Do YYYY')}</span>
            </div>
            
            <h3 className="list-item__amount">₹ {this.props.details.amount}</h3>
        </Link>
    );
    }
};
const ConnectedExpenseListItem = connect()(ExpenseListItem);    // note that here we don't need any state, we just need to use dispatch() to the store


// Expense Filters
class ExpenseListFilter extends React.Component {
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
    <div className="filter-box">
        <Container>
        <Row>
            <Col xs={12} md={3} className="filter-box__searchCol">
                <input type="text" className="filter-box__search" value={this.props.filters.text} onChange={(e) => {
                    this.props.dispatch(setTextFilter({text:e.target.value}));
                }} placeholder="Search Expenses"/>
            </Col>
            <Col xs={12} md={3} className="filter-box__sort">
                <Row>
                    <Col xs={4} className="filter-box__drop-headerCol">
                        <h4 className="filter-box__drop-header">Sort By </h4>
                    </Col>
                    <Col xs={8} className="filter-box__dropCol">
                        <select className="filter-box__drop" value={this.props.filters.sortBy} onChange={(e) => {
                            if(e.target.value === 'amount') this.props.dispatch(sortByAmount());
                            else this.props.dispatch(sortByDate());
                        }}>
                            <option value='amount'>Amount</option>
                            <option value='date'>Date</option>
                        </select>
                    </Col>
                </Row>
            </Col>
            <Col xs={12} md={6}>
                <div className="filter-box__date">
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
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={3}>
            <div className="filter-box__category">
            <select className="filter-box__category-drop" defaultValue={this.props.filters.category} onChange={(e) => {
                    const category = e.target.value;
                    this.props.dispatch(setCategory(category));
            }}>
                    <option value='allCategory'>All Category</option>
                    <option value="foodAndDrinks">Food & Drinks</option>
                    <option value="shopping">Shopping</option>
                    <option value="housing">Housing</option>
                    <option value="transportation">Transportation</option>
                    <option value="lifeAndEntertainment">Life & Entertainment</option>
                    <option value="communication">Communication</option>
                    <option value="financialExpense">Financial Expense</option>
            </select>
            </div>
            </Col>
        </Row>
        </Container>
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
class ExpenseList extends React.Component{
    render(){
    var expenses = this.props.expenses;
    //console.log('ExpenseList : expenses : ',expenses);
    return(
    <div className="list-wrapper">
        {expenses.map(expense => {
            //console.log('expense : ',expense);
            return <ConnectedExpenseListItem key={expense.id} details={expense}/>})
        }
    </div>
    );
    };
};
const mapStatetoProps_EL = (state) => {
    return {
        expenses: reorderExpenses(state.expenses,state.filters)
    };
}
const ConnectedExpenseList = connect(mapStatetoProps_EL)(ExpenseList);


// Expense Summary
const ExpenseSummary = (props) => {
    return(
        <div className="summary-box">
            <Container>
            <Row>
                <Col>
                    <div className="summary-box__content">Total Expense(s) : <span>{props.totExpense}</span></div>
                </Col>
                <Col>    
                    <div className="summary-box__content">Total Amount : <span>{props.totAmount}</span></div>
                </Col>
                <Col>
                    <Link to="/create" style={{ textDecoration:'none' }}><Button className="box-layout__button" variant="flat"><div className="summary-box__button">Add Expense</div></Button></Link>
                </Col>
            </Row>
            </Container>
        </div>
    );
};
const mapStatetoProps_ES = (state) => {
    var visibleExpenses = reorderExpenses(state.expenses,state.filters);
    return {
        totExpense: visibleExpenses ? visibleExpenses.length : 0,
        totAmount: getTotAmount(visibleExpenses)
    };
}
const ConnectedExpenseSummary = connect(mapStatetoProps_ES)(ExpenseSummary);


// Main DashBoard
export const ExpenseDashboardPage = (props) => {
    return(
    <div>
        <div className="dashboard__header">
            <ConnectedExpenseSummary />
            <ConnectedExpenseListFilter />
        </div>
        <div>
            <ConnectedExpenseList />
        </div>
    </div>
    );
};