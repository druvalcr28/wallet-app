import moment from 'moment';

// Reducer for filters
    // sortBy 'amount' or 'date'
export default (state={text:'',sortBy:'amount',startDate:moment().startOf('month'),endDate:moment().endOf('month'),category:'allCategory'},action) => {
    var resultFilter;
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
            resultFilter = Object.assign({}, state);
            resultFilter.startDate = action.startDate;
            return resultFilter;
        case 'SET_END_DATE':
            resultFilter = Object.assign({}, state);
            resultFilter.endDate = action.endDate;
            return resultFilter;
        case 'SET_CATEGORY':
            resultFilter = Object.assign({}, state);
            resultFilter.category = action.category;
            return resultFilter;
        default:
            return state;
    }
};