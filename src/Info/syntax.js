/*
Both the codes are the same.
But note that in the 1st code we can write some code before return statement, but in the 2nd
code its implicitly returning an jsx experssion
*/
// 1st code
const ExpenseListItem = (props) => {
    console.log(props);
    return (
        <div>
            <h3>{props.details.description}</h3>
            <p>{props.details.amount} - {props.details.createdAt}</p>
        </div>
    );
};

// 2nd code
const ExpenseListItem = (props) => (
    <div>
        <h3>{props.details.description}</h3>
        <p>{props.details.amount} - {props.details.createdAt}</p>
    </div>
);

/* Sample Code : connecting to store */
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