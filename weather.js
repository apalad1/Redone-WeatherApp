let appId =''; /*insert your own openweather appid*/
/*celsius=metric , farenheit=imperial*/
let units ='imperial';
let searchMethod;

/*CLOCK SECTION moved to just a script tag on html*/


/*EVERYTHING ELSE*/

function getSearchMethod(searchTerm){
	/*determines if its a zipcode, parses and splits off the string intiially
	then compares that leftover with the initial, if its an exact match the initial
	was a 5 digit zip code
	*/
	if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
		searchMethod = 'zip';
	} else{
		searchMethod = 'q';
	}
}

/*
call url and searchterm, wait for information with then, convert to json
then call init with result from server
*/
function searchWeather(searchTerm){
	getSearchMethod(searchTerm);
	/*backticks not quotation marks*/
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
		return result.json();
	}).then(result => {
		init(result);
	})
	
}


function init(resultFromServer){
	switch(resultFromServer.weather[0].main){
		case 'Clear':
		document.body.style.backgroundImage = 'url("clear.jpeg")';
			break;

		case 'Clouds':
		document.body.style.backgroundImage = 'url("cloudy.jpeg")';
			break;

		/*runs all 3 as the same*/
		case 'Rain':
		case 'Drizzle':
		case 'Mist':
		document.body.style.backgroundImage = 'url("rain.jpeg")';
			break;

		case 'Thunderstorm':
		document.body.style.backgroundImage = 'url("storm.jpeg")';
			break;

		case 'Snow':
		document.body.style.backgroundImage = 'url("snow.jpeg")';
			break;

		default:
			break;
	}

	let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	let temperatureElement = document.getElementById('temperature');
	let humidityElement = document.getElementById('humidity');
	let windSpeedElement = document.getElementById('windSpeed');
	let cityHeader = document.getElementById('cityHeader');
	let weatherIcon = document.getElementById('documentIconImg');

	/*supposed to display icon but its not, guessing the url setup changed*/
	weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '@2x.png'; 

	let resultDescription = resultFromServer.weather[0].description;
	weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
	/*the 176 is the degree symbol*/
	temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';

	windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + ' %';

	/*check */
	console.log(resultFromServer);
	setPositionForWeatherInfo();
}

document.getElementById('searchBtn').addEventListener('click', () => {
	let searchTerm = document.getElementById('searchInput').value;
	if(searchTerm){
		searchWeather(searchTerm);
	}
})


function setPositionForWeatherInfo(){
	let weatherContainer = document.getElementById('weatherContainer');
	let weatherContainerHeight = weatherContainer.clientHeight;
	let weatherContainerWidth = weatherContainer.clientWidth;

	weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
	/*sothat when you search the weathercontainer box displays*/
	weatherContainer.style.visibility = 'visible';
}
