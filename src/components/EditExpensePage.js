import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from './ExpenseForm';
import { editExpense } from '../actions/expenses';
// props.match.params.id : gets information from the url
const EditExpensePage = (props) => {
    console.log(props.expense);
    return (
        <div>
            <ExpenseForm
            expense={props.expense}
            handleSubmit={(expense) => {
                props.dispatch(editExpense({id:props.expense.id,updates:expense}));
                props.history.push('/');
            }}/>
        </div>
    );
};
const mapStateToProps_EEP = (state,props) => {  // Note that we can use props also
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};
export const ConnectedEditExpensePage = connect(mapStateToProps_EEP)(EditExpensePage);
