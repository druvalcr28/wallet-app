import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
    <div>
        Add Expense
        <ExpenseForm handleSubmit={(expense) => {
            props.dispatch(addExpense({
                description: expense.description,
                note: expense.note,
                amount: expense.amount,
                createdAt: expense.createdAt
            }));
            props.history.push('/');
        }}/>
    </div>
);
export const ConnectedAddExpensePage = connect()(AddExpensePage);
