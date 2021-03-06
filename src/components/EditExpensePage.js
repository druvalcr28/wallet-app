import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from './ExpenseForm';
import { startEditExpense } from '../actions/expenses';
import { startRemoveExpense } from '../actions/expenses';

// props.match.params.id : gets information from the url
const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm
            expense={props.expense}
            handleSubmit={(expense) => {
                props.dispatch(startEditExpense({id:props.expense.id,updates:expense}));
                //props.history.push('/dashboard');
                setTimeout(function(){ props.history.push('/dashboard'); }, 1000);
            }}/>
            <div className="expenseform expense-remove">
                <button className="expense-remove__button" onClick={() => {
                    props.dispatch(startRemoveExpense({id:props.expense.id}));
                }}>Remove</button>
            </div>
        </div>
    );
};
const mapStateToProps_EEP = (state,props) => {  // Note that we can use props also
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};
export const ConnectedEditExpensePage = connect(mapStateToProps_EEP)(EditExpensePage);
