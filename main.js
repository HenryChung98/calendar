// api keys
const weatherKey = config.weatherKey;


// api urls
// const weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=";
const weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?units=metric&q=vancouver&cnt=5&appid=a921a0952d8dfef21e6000917f63168b";
const quotesUrl = "https://type.fit/api/quotes";

// variables
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysOfWeekFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weatherIcon1 = document.querySelector("#first");
const weatherIcon2 = document.querySelector("#second");
const weatherIcon3 = document.querySelector("#third");
const weatherIcon4 = document.querySelector("#fourth");
const weatherIcon5 = document.querySelector("#fifth");

let randomNum = Math.floor(Math.random() * 16);
// background
let backgroundNum = 1;
let backgroundType = 'jpg';
let imageUrl = `images/background/${backgroundType}s/${backgroundNum}.${backgroundType}`;
let img = new Image();
img.onload = function() {
    // 이미지가 로드된 후에 배경 이미지로 설정
    document.documentElement.style.backgroundImage = 'url(' + imageUrl + ')';
    document.documentElement.style.backgroundSize = 'cover';
    document.documentElement.style.backgroundRepeat = 'no-repeat';
    document.documentElement.style.backgroundPosition = 'center center';
    
};
img.src = imageUrl;

// Quotes
fetch(quotesUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    document.getElementById("quotes").innerHTML = data[randomNum].text + "<br><br>" + data[randomNum].author;
  });


    async function getLocation() {
    // const responseWeather = await fetch(weatherUrl + city + `&cnt=${days}` + `&appid=${weatherKey}`);
    const responseWeather = await fetch(weatherUrl);
    var data = await responseWeather.json();
  
    if (responseWeather.status == 404) {
        alert("Wrong city name");
    }
  
    else {
        console.log(data);
        // 현재 날짜를 기본값으로 설정
        const current = new Date();
        current.setSeconds(current.getSeconds() + 8 * 3600); // convert to UTC from vancouver time
        current.setSeconds(current.getSeconds() + data.city.timezone);
        const currentYear = current.getFullYear();
        const currentMonth = current.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
        
        // weather
        document.querySelector("#celsius").innerHTML = Math.round(data.list[0].main.temp) + "°c";

        document.querySelector("#fiveDays2").innerHTML = daysOfWeek[(current.getDay() + 1) % 7];
        document.querySelector("#fiveDays3").innerHTML = daysOfWeek[(current.getDay() + 2) % 7];
        document.querySelector("#fiveDays4").innerHTML = daysOfWeek[(current.getDay() + 3) % 7];
        document.querySelector("#fiveDays5").innerHTML = daysOfWeek[(current.getDay() + 4) % 7];

        setWeatherIcon(data.list[0].weather[0], weatherIcon1);
        setWeatherIcon(data.list[1].weather[0], weatherIcon2);
        setWeatherIcon(data.list[2].weather[0], weatherIcon3);
        setWeatherIcon(data.list[3].weather[0], weatherIcon4);
        setWeatherIcon(data.list[4].weather[0], weatherIcon5);

        document.querySelector("#dayTemp1").innerHTML = Math.round(data.list[0].main.temp_max) + " / " + Math.round(data.list[0].main.temp_min);
        document.querySelector("#dayTemp2").innerHTML = Math.round(data.list[1].main.temp_max) + " / " + Math.round(data.list[0].main.temp_min);
        document.querySelector("#dayTemp3").innerHTML = Math.round(data.list[2].main.temp_max) + " / " + Math.round(data.list[0].main.temp_min);
        document.querySelector("#dayTemp4").innerHTML = Math.round(data.list[3].main.temp_max) + " / " + Math.round(data.list[0].main.temp_min);
        document.querySelector("#dayTemp5").innerHTML = Math.round(data.list[4].main.temp_max) + " / " + Math.round(data.list[0].main.temp_min);
        //weather


        // time, date formats
        let forDate;
        let hours = current.getHours();
        hours = (hours >= 12)? hours - 12 : hours;
        let minutes = current.getMinutes();
        let seconds = current.getSeconds();
        let ampm = (hours >= 12)? "PM" : "AM";
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10){
            seconds = "0" + seconds;
        }
   
        if (current.getDate() == "1" || current.getDate() == "21" || current.getDate() == "31"){
            forDate = "st";
        }
        else if (current.getDate() == "2" || current.getDate() == "22"){
            forDate = "nd";
        }
        else if (current.getDate() == "3" || current.getDate() == "23"){
            forDate = "rd";
        }
        else{
            forDate = "th";
        }

        document.querySelector("#currentTime").innerHTML = hours + ' : ' + minutes;
        document.querySelector("#currentDate").innerHTML = daysOfWeekFull[current.getDay()] + ", " + current.getDate() + forDate + "&nbsp&nbsp" + monthNames[current.getMonth()];
        document.querySelector("#currentYear").innerHTML = current.getFullYear();
        document.querySelector("#ampm").innerHTML = ampm;
        createCalendar(currentYear, currentMonth);
        // time, date formats
    }

}

// set weather icons
function setWeatherIcon(weather, element) {
    const iconMapping = {
        "Clear": "clear.png",
        "Clouds": "clouds.png",
        "Rain": "rain.png",
        "Snow": "snow.png",
        "Fog": "fog.png" 
    };

    const weatherMain = weather.main;

    // 아이콘 매핑이 있는 경우에만 설정
    if (iconMapping.hasOwnProperty(weatherMain)) {
        element.src = "images/icons/" + iconMapping[weatherMain];
    }
    else{
        element.src = "images/icons/questionMark.png";
    }
}

// create calender funcition
function createCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay(); // 주의 첫 날짜의 인덱스

  const calendarContainer = document.getElementById('calendarBox');

  // create table
  const table = document.createElement('table');

  // create month header
  const monthHeader = table.createTHead();
  const monthRow = monthHeader.insertRow();
//   const monthCell = monthRow.insertCell();

//   monthCell.colSpan = 7;
//   monthCell.textContent = monthNames[month - 1];
//   monthCell.style.fontSize = '30px';
//   monthCell.style.width = '1200px';

  // create days header
  const headerRow = table.insertRow();
  daysOfWeek.forEach(day => {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = day;
      headerCell.style.fontSize = '20px';
      headerCell.style.width = '171.42px';
      headerCell.style.background = 'white';
  });

  // fill dates
  let day = 1;

  for (let i = 0; i < 6; i++) {
      const row = table.insertRow();

      for (let j = 0; j < 7; j++) {
          if (i === 0 && j < startingDay) {
              // 첫 주의 시작일 이전은 빈 셀로 채우기
              const cell = row.insertCell();
              cell.textContent = '';
            } 
          else if (day > daysInMonth) {
              // 마지막 날짜 이후는 빈 셀로 채우기
              break;
            } 
          else {
              // 유효한 날짜인 경우 날짜를 채우기
              const cell = row.insertCell();
              cell.style.height = '200px';
              cell.textContent = day;
              cell.style.textAlign = 'start';
              cell.style.borderTop = '3px solid black';
              day++;
            } 
      }
  }

  // delete calendar old and create new calendar
  while (calendarContainer.firstChild) {
      calendarContainer.removeChild(calendarContainer.firstChild);
  }
  calendarContainer.appendChild(table);

}

test = "vancouver";

getLocation();