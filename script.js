
const timeDiv = document.getElementById('time');
const dateDiv = document.getElementById('date');

const clckFunc = () => {
  let date = new Date();
  let data = String(date).split(" ");
  let time = Array.from(data[4].split(":"));
  timeDiv.innerHTML = time[0] + " : " + time[1] + " : " + time[2];

  let day = date.getDay();
  let Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  dateDiv.innerHTML = data[2] + " " + data[1] + " " + data[3] + ", " + Day[day];
}

let timerId = setInterval(clckFunc, 1000);


const form = document.querySelector('#weather-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form submission

  const location = document.querySelector('#location').value;
  const unitGroup = document.querySelector('#unitGroup').value;
  const apiKey = 'MUG7HRWXKW9WL9AZPY528NZ4P'; // replace with your own API key

  let tempUnit = "&#x2103";
  if(unitGroup == "us"){
    tempUnit = "&#x2109";
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&include=events%2Cdays%2Chours%2Calerts%2Ccurrent&key=${apiKey}&contentType=json`;

  const request = new Request(url, {
    "method": "GET",
    "headers": {

    }
  })
  const response = fetch(request)
  response.then(intermidiate => {
    return intermidiate.json();
  }).then(data => {
    console.log(data)
    ihtml = " ";
    const containerWeather = document.getElementsByClassName('container-weather')[0];

    const leftContainer = document.getElementsByClassName('container-left-info')[0];
    leftContainer.innerHTML += `<h2 style="text-decoration: underline;color: #F6D8D8;">Timezone</h2>
      <div id="timezone">${data.timezone}</div><hr>
      <h2 style="text-decoration: underline;">Current Conditions</h2>
      <div class = "more-info">Cloud Cover: ${data.currentConditions.cloudcover}%</div>
      <div class = "more-info">Dew : ${data.currentConditions.dew}</div>
      <div class = "more-info">Humidity : ${data.currentConditions.humidity}</div>
      <div class = "more-info">Solar-Energy : ${data.currentConditions.solarenergy}</div>
      <div class = "more-info">Solar-Radiation : ${data.currentConditions.solarradiation}</div>
      <div class = "more-info">UV-Index : ${data.currentConditions.uvindex}</div>
      <div class = "more-info">Description : ${data.days[0].description}</div>`

    for (item in data.days) {
      let date = data.days[item].datetime;
      if (item == 0) {
        date = "Today"
      }
      else if (item == 1) {
        date = "Tomorrow";
      }

      let condition = data.days[item].conditions;
      let temperature = data.days[item].temp;
      let icon_url = "icons/default.png";
      if (condition == "Partially cloudy") {
        icon_url = "icons/partiallycloudy.png";
      }
      else if (condition == "Clear") {
        icon_url = "icons/sun.png";
      }
      else if (condition == "Cloudy") {
        icon_url = "icons/cloudy.png";
      }
      else if (condition == "Overcast") {
        icon_url = "icons/overcast.png";
      }

      else if (condition == "Rain" || condition == "Rain, Partially cloudy") {
        icon_url = "icons/rain.png";
      }

      let solarEnergy = data.currentConditions.solarenergy;

      if (solarEnergy == null) {
        icon_url = "icons/night.png";
      }

      if (temperature < 10) {
        icon_url = "icons/lowtemp.png";
      }

      else if ((temperature > 45 && unitGroup=="matric") || (temperature > 113 && unitGroup=="us")) {
        icon_url = "icons/hightemp.png";
      }

      ihtml += `<div class="card ${item}">
        <h2 style = "text-decoration: underline">${date}</h2>
        <div class="card-upper-part">
          <img class="card-image" src=${icon_url}>
          <div class="upper-left">
            <h3> <abbr title="Min. Temp of the day">${data.days[item].tempmin} ${tempUnit} </abbr> </h3>
            <h1> <abbr title="Current Temperature">${data.days[item].temp} ${tempUnit} </abbr> </h1>
            <h3> <abbr title="Max. Temp of the day">${data.days[item].tempmax} ${tempUnit} </abbr> </h3>  
          </div>
        </div>

        <div class="card-middle-part">
          <h2>${data.days[item].conditions}</h2>
          <p> Chances of Precipitation: <b>${data.days[item].precipprob}</b></p>
          <p> Wind-Speed: <b>${data.days[item].windspeed}</b> kmph </p>
        </div>

        <div class="card-lower-part">
          <div class="card-lower-left">
            <h2 style = "text-decoration: underline"> ${data.days[item].pressure}Pa</h2> 
            <h5> Pressure </h5>
            <h2 style = "text-decoration: underline"> ${data.days[item].sunrise} </h2>
            <h5> Sunrise </h5>
          </div>

          <div class="card-lower-right">
            <h2 style = "text-decoration: underline"> ${data.days[item].visibility} </h2>
            <h5> Visibility </h5>
            <h2 style = "text-decoration: underline"> ${data.days[item].sunset} </h2>
            <h5> Sunset </h5>
          </div>
        </div>
      </div>`

      containerWeather.innerHTML = ihtml;
    }
  })
    .catch(err => {
      console.log(err)
    })
});

//Right Container
// function getFacts() {
// let date = new Date();
// let data = String(date).split(" ");
// let month_no = date.getMonth() + 1;
// console.log(data[2]);
// console.log(month_no);
// fetch(`http://www.numbersapi.com/#${month_no}/${data[2]}/date`)
//   .then((response) => response.text())
//   .then((data) => {
//     console.log(data);
//   })
// }
// getFacts()
