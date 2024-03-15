const chart = document.querySelector('#myChart').getContext("2d");

const labels = ["EON-12A", "EON-12HP", "EON-PA", "EON-15A", "EON-15D", "EON-15HP"];
const data = {
	labels,
	datasets: [
		{
			data: [31, 51, 44, 36, 14, 31],
			label: "Item Quantity Per Model",
		},
	],
};
var barColors = "#F3B52A";

const config = {
	type: "bar",
	data: data,
	options: {
		responsive: true,
	},
};

const myChart = new Chart(chart, config);