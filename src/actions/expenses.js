// eslint-disable-next-line
import uuid from 'uuid';

import { database } from '../firebase/firebase';

// ADD_EXPENSE : while not using firebase
// export const addExpense = ({description='',note='',amount=0,createdAt=0}={}) => ({
//     type: 'ADD_EXPENSE',
//     expense: {
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createdAt
//     }
// });
// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense: expense
});
export const startAddExpense = ({description='',note='',amount=0,createdAt=0,category='others'}={}) => {
    return (dispatch,getState) => {
        const uid = getState().auth.userID;
        const expense = {description,note,amount,createdAt,category}
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE : while not using firebase
// export const removeExpense = ({id}={}) => ({
//     type: 'REMOVE_EXPENSE',
//     id: id
// });
// REMOVE_EXPENSE
export const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});
export const startRemoveExpense = ({id}={}) => {
    return (dispatch,getState) => {
        const uid = getState().auth.userID;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then((ref) => {
            dispatch(removeExpense({id}));
        });
    }; 
}; 

// EDIT_EXPENSE : while not using firebase
// export const editExpense = ({id,updates}={}) => ({
//     type: 'EDIT_EXPENSE',
//     id: id,
//     updates: updates 
// });
// EDIT_EXPENSE
export const editExpense = ({id,updates}) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    updates: updates 
});
export const startEditExpense = ({id,updates} = {}) => {
    return (dispatch,getState) => {
        const uid = getState().auth.userID;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense({
                id: id,
                updates: updates
            }));
        });
    };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});
export const startSetExpenses = () => {
  return (dispatch,getState) => {
    const uid = getState().auth.userID;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setExpenses(expenses));
    });
  };
};
