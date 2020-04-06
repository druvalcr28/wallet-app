
import moment from 'moment';

export default (expenses,{text,sortBy,startDate,endDate,category}) => {
    function isAccepted(expense) {
        var datelower=true,dateupper=true,textInclude=true,categoryInclude=true;
        if(startDate) datelower = (moment(expense.createdAt).startOf('day') >= moment(startDate).startOf('day'));
        if(endDate) dateupper = (moment(expense.createdAt).startOf('day') <= moment(endDate).startOf('day'));
        if(category && category!=='allCategory'){
            categoryInclude = (expense.category === category);
        }
        if(!expense.description && text) textInclude=false;
        else if(expense.description && text) textInclude = expense.description.toLowerCase().includes(text.toLowerCase());
        return datelower && dateupper && textInclude && categoryInclude;
    }
    if(!expenses) return [];
    var result = expenses.filter(isAccepted);
        
    result.sort(function (a, b) {
        if(sortBy==='amount')   return a.amount - b.amount;
        else return (moment(a.createdAt).startOf('day') - moment(b.createdAt).startOf('day'));
    });
    return result;
};