import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import { connect } from 'react-redux';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class PieChart extends Component {
	convertName = (name) => {
		if(name==='foodAndDrinks') return 'Food, Drinks';
		if(name==='shopping') return 'Shopping';
		if(name==='housing') return 'Housing';
		if(name==='transportation') return 'Transportation';
		if(name==='lifeAndEntertainment') return 'Entertainment';
		if(name==='communication') return 'Communication';
		if(name==='financialExpense') return 'Financial';
		return 'others';
    }
	render() {
		var categoryCount = {}
		for(var i=0;i<this.props.expenses.length;i++){
			var category = this.props.expenses[i].category;
			if(category in categoryCount){
				categoryCount[category]++;
			}
			else{
				categoryCount[category] = 1;
			}
		}
		var dataPoints=[],k;
		for(k in categoryCount){
			dataPoints.push({y:categoryCount[k], label:this.convertName(k)});
		}
		const options = {
			exportEnabled: false,
			animationEnabled: true,
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 13,
				indexLabel: "{label} : {y}",
				dataPoints: dataPoints
			}]
		}
		
		return (
		<div>
			{dataPoints.length===0?
			<h4 align='center' className="chart__header">No Expenses</h4>
			:
			<div>
				<h4 align='center' className="chart__header">Expense Category</h4>
				<CanvasJSChart options = {options} />
			</div>
			}
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
const mapStateToProps_PC = (state) => {
	return {
		expenses: state.expenses
	};
}
const ConnectedPieChart = connect(mapStateToProps_PC)(PieChart)

export default ConnectedPieChart;