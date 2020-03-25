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