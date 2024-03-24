const tdpmchart = document.querySelector('#tdpmChart').getContext("2d");

const labels = ["No Sound", "No Power", "No Defect", "Crackling Sound", "Other"];
const data = {
	labels,
	datasets: [
		{
			data: [27, 18, 13, 24, 22],
			label: "PC/S",
            fill: true,
            backgroundColor: "#FFD26F"
		},
	],
};

const config = {
	type: "bar",
	data: data,
	options: {
		responsive: true,
	},
};

const chart = new Chart(tdpmchart, config);