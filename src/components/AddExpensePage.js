import React from 'react';
import { connect } from 'react-redux';
import { ExpenseForm } from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
    <div>
        Add Expense
        <ExpenseForm handleSubmit={(expense) => {
            props.dispatch(startAddExpense({
                description: expense.description,
                note: expense.note,
                amount: expense.amount,
                createdAt: expense.createdAt
            }));
            props.history.push('/dashboard');
        }}/>
    </div>
);
export const ConnectedAddExpensePage = connect()(AddExpensePage);
