
/*
->  Redux is the state management library with asynchronous capabilities. 
->  The two dependencies to keep in mind are 'axios' to make async requests and 
    'redux-thunk' to manage async state.
*/

import { createStore,combineReducers } from 'redux';
import uuid from 'uuid';

// ES6 refers to version 6 of the ECMA Script programming language. ... It is a major enhancement to the JavaScript language

// Action will be dispatched to both the reducers

// Action generator : function that implicitly returns action object
// const addExpense = ({}={}) => ({});

// ADD_EXPENSE
const addExpense = ({description='',note='',amount=0,createdAt=0}={}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({id}={}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

// EDIT_EXPENSE
const editExpense = ({id,updates}={}) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    updates: updates 
});

// Reducer for expenses : handle actions on expenses
    // default expense : []
/* Note that in reducers output should be the updated state, but the current state
    shouldn't change
    return state.push(action.expense)   // it changes current state also
    
    return state.concat(action.expense)   // it doesn't change current state
    return [...state,action.expense]
*/
const expensesReducer = (state=[],action) => {
    var result,indx;
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state,action.expense];
        case 'REMOVE_EXPENSE':
            /*
            Why Can’t I Use = to Copy an Array?
            Because arrays in JS are reference values, so when you try to copy it using the = it will only copy the reference to the original array and not the value of the array.
            */
            //var result = state;   we CAN'T do this because in JS result is a reference to state itself
            
            result = [...state];    // this is the way to clone in es6
            for(indx=0;indx<state.length;indx++){
                if(state[indx].id === action.id) break;
            }
            result.splice(indx,1);
            return result;
            
            // const result = state.filter(({id}) => {      also valid
            //     return id !== action.id;
            // });
            // return result;
        case 'EDIT_EXPENSE':
            result = [...state]; 
            for(indx=0;indx<state.length;indx++){
                if(state[indx].id === action.id) break;
            }
            if(action.updates.hasOwnProperty('description'))
                result[indx].description = action.updates.description;
            if(action.updates.hasOwnProperty('note'))
                result[indx].note = action.updates.note;
            if(action.updates.hasOwnProperty('amount'))
                result[indx].amount = action.updates.amount;
            if(action.updates.hasOwnProperty('createdAt'))
                result[indx].createdAt = action.updates.createdAt;
            return result;
        default:
            return state;
    }
};

// SET_TEXT_FILTER
const setTextFilter = ({text} = {}) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = ({startDate}={}) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = ({endDate}={}) => ({
    type: 'SET_END_DATE',
    endDate
});

// Reducer for filters
    // sortBy 'amount' or 'date'
const filtersReducer = (state={text:'',sortBy:'amount',startDate:undefined,endDate:undefined},action) => {
    var resultFilter,indx;
    switch(action.type){
        case 'SET_TEXT_FILTER':
            resultFilter = Object.assign({}, state);
            resultFilter.text = action.text;
            return resultFilter;
        case 'SORT_BY_AMOUNT':
            resultFilter = Object.assign({}, state);
            resultFilter.sortBy = 'amount';
            return resultFilter;
        case 'SORT_BY_DATE':
            resultFilter = Object.assign({}, state);
            resultFilter.sortBy = 'date';
            return resultFilter;
        case 'SET_START_DATE':
            console.log(action.startDate);
            resultFilter = Object.assign({}, state);
            resultFilter.startDate = action.startDate;
            return resultFilter;
        case 'SET_END_DATE':
            console.log(action.endDate);
            resultFilter = Object.assign({}, state);
            resultFilter.endDate = action.endDate;
            return resultFilter;
        default:
            return state;
    }
};


const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) => {
    var result = expenses.filter(expense => 
        expense.createdAt >= startDate && expense.createdAt <= endDate && 
        expense.description.toLowerCase().includes(text.toLowerCase()));
        
    result.sort(function (a, b) {
        if(sortBy==='amount')   return a.amount - b.amount;
        else return a.createdAt - b.createdAt;
    });
    return result;
};

// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const exp1 = store.dispatch(addExpense({description:'Random Des1',amount:1000,createdAt:200}));
const exp2 = store.dispatch(addExpense({description:'Random Des2',amount:2000,createdAt:700}));
const exp3 = store.dispatch(addExpense({description:'Random Des3',amount:1500,createdAt:600}));

store.dispatch(setStartDate({startDate:500}));
store.dispatch(setEndDate({endDate:1000}));







