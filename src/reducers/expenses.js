// Reducer for expenses : handle actions on expenses
    // default expense : []
/* Note that in reducers output should be the updated state, but the current state
    shouldn't change
    return state.push(action.expense)   // it changes current state also
    
    return state.concat(action.expense)   // it doesn't change current state
    return [...state,action.expense]
*/
export default (state=[],action) => {
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
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};