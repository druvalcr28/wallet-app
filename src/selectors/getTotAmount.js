
export default (expenses) => {
    var total=0,i=0;
    for (i=0;i<expenses.length;i++) {
        total += expenses[i].amount;
    }
    return total;
}; 