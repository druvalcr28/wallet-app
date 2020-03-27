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
export const startAddExpense = ({description='',note='',amount=0,createdAt=0}={}) => {
    return (dispatch) => {
        const expense = {description,note,amount,createdAt}
        return database.ref('expenses').push(expense).then((ref) => {
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
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then((ref) => {
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
    return (dispatch) => {
        console.log(updates);
        return database.ref(`expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense({
                id: id,
                updates: updates
            }));
        });
    };
};
