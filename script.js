// api url
const api_url =
	"https://api.openweathermap.org/data/3.0/onecall?lat=51.781634&lon=-2.200388&exclude=alerts&units=metric&appid=456d588c4dbaf50a8f8d9eb541e4d470";
let tabtoday = "";
let tabfuture = "";
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const URIstart = 'http://openweathermap.org/img/wn/';
const URIend = '@2x.png';
let minutelyPOP = [];
const hourstodisplay = [1, 2, 3, 5, 7, 9, 11];


// Defining async function
async function getapi(url) {

	// Storing response
	let response = await fetch(url);

	// Storing data in form of JSON
	let data = await response.text();
	let jsondata = JSON.parse(data);

	console.log(data);
	if (response) {
		hideloader();
	}
	show(jsondata);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
	tabfuture =
		`<tr>
		<th>Day</th>
		<th>Weather</th>
		</tr>`;
	tabtoday = '';
	data.minutely.forEach(minutesPrecip);
	if (minutelyPOP[0] = "0") {
		rainTxt = "No rain for " + minutelyPOP.lastIndexOf(0) + " minutes";
	} else {
		rainTxt = "Rain for " + minutelyPOP.indexOf(0) + " minutes";
	}
	buildtableCurrent(data.current.dt, data.current.temp, data.current.weather[0].icon, data.current.uvi, rainTxt);
	data.daily.forEach(buildtableDaily);
	//var weatherdt = new Date();
	for (let value in hourstodisplay) {
		//window.alert(hourstodisplay[value]);
		//window.alert(data.hourly[value].dt);
		var date = new Date(data.hourly[hourstodisplay[value]].dt * 1000);
		//window.alert(date);
		//		var date = new date(data.hourly[value].dt * 1000);
		tabtoday += `<td style="text-align:center">
					${date.toLocaleTimeString("en-GB").substring(0, date.toLocaleTimeString("en-GB").length - 3)}</br>
					${"<img src=" + URIstart + data.hourly[hourstodisplay[value]].weather[0].icon + URIend + ">"}</br >
					${"<h2>" + data.hourly[hourstodisplay[value]].temp.toFixed()} <span>&#176;</span>C</h2 ></br >
						${"<p> &#9730; " + data.hourly[hourstodisplay[value]].pop.toPrecision(3) * 100 + "% &#9788;" + data.hourly[hourstodisplay[value]].uvi.toFixed()}
					</td>`
	}
	//hourstodisplay.forEach(buildtableHourly);
	document.getElementById("today").innerHTML = tabtoday;
	document.getElementById("future").innerHTML = tabfuture;
}

function minutesPrecip(value) {
	minutelyPOP.push(value.precipitation)
}

function buildtableCurrent(dateutc, temp, icon, uvi, preciptxt) {
	var date = new Date(dateutc * 1000);
	tabtoday += `<td style="text-align:center">
		${date.toLocaleTimeString("en-GB").substring(0, date.toLocaleTimeString("en-GB").length - 3)}</br >
		${"<img src=" + URIstart + icon + URIend + ">"}</br >
			${"<h2>" + temp.toFixed()} <span>&#176;</span>C</h2 ></br >
				${"<p>" + preciptxt + " &#9788;" + uvi.toFixed()}
		</td > `

}

function buildtableDaily(value, index, array) {
	var date = new Date(value.dt * 1000);
	tabfuture += `<tr>
		<td style="text-align:center">${day[date.getDay()] + "<br>" + date.getDate() + "-" + month[date.getMonth()]} </td>
		<td style="text-align:center">${"<img src=" + URIstart + value.weather[0].icon + URIend + ">"}</td>
		<td style="text-align:center">${"<h2>" + value.temp.day.toFixed()}<span>&#176;</span>C</h2>
		${"<p> &#9730; " + value.pop.toPrecision(3) * 100 + "% &#9788;" + value.uvi.toFixed()}</td>
	</tr>`;
}