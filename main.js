// api keys
const weatherKey = "a921a0952d8dfef21e6000917f63168b";

//api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&appid=a921a0952d8dfef21e6000917f63168b
//api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=a921a0952d8dfef21e6000917f63168b

// api urls
const weatherUrl = "api.openweathermap.org/data/2.5/forecast/daily?q=";

// variables
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysOfWeekFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    document.getElementById("quotes").innerHTML = data[randomNum].text + "<br><br>" + data[randomNum].author;
    console.log(data);
  });


async function getLocation(city, weatherTime) {
  
    const responseWeather = await fetch(weatherUrl + city + `&cnt=${weatherTime}` +`&appid=${weatherKey}`);
    var data = await responseWeather.json();
  
    if (responseWeather.status == 404) {
        alert("Wrong city name");
    }
  
    else {
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
  const monthCell = monthRow.insertCell();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthCell.colSpan = 7;
  monthCell.textContent = monthNames[month - 1];
  monthCell.style.fontWeight = 'bold';

  // create days header
  const headerRow = table.insertRow();
  daysOfWeek.forEach(day => {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = day;
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
          } else if (day > daysInMonth) {
              // 마지막 날짜 이후는 빈 셀로 채우기
              break;
          } else {
              // 유효한 날짜인 경우 날짜를 채우기
              const cell = row.insertCell();
              cell.textContent = day;
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



// 현재 날짜를 기본값으로 설정
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.



createCalendar(currentYear, currentMonth);