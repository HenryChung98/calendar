// api keys
const weatherKey = config.weatherKey;

// api urls
const weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

// time
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysOfWeekFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const current = new Date();
// current.setSeconds(current.getSeconds() + 8 * 3600); // convert to UTC from vancouver time
// current.setSeconds(current.getSeconds() + data.city.timezone); 
const currentYear = current.getFullYear();
const currentMonth = current.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.

// weather icons
const weatherIcon1 = document.querySelector("#first");
const weatherIcon2 = document.querySelector("#second");
const weatherIcon3 = document.querySelector("#third");
const weatherIcon4 = document.querySelector("#fourth");
const weatherIcon5 = document.querySelector("#fifth");
const weatherCity = document.querySelector("#city");

// buttons
const weatherBtn = document.querySelector("#weatherPopup button");
const weatherCloseBtn = document.querySelector(".weatherCloseIcon");
const stockCloseBtn = document.querySelector(".stockCloseIcon");
const noteCloseBtn = document.querySelector(".noteCloseIcon");


// etc
const overlay = document.getElementById('overlay');


// background
var backgroundNum = 1;
var backgroundType = 'jpg';
let imageUrl = `images/background/${backgroundType}s/${backgroundNum}.${backgroundType}`;
let img = new Image();
function setBackground() {
    // 이미지가 로드된 후에 배경 이미지로 설정
    imageUrl = `images/background/${backgroundType}s/${backgroundNum}.${backgroundType}`;
    document.documentElement.style.backgroundImage = 'url(' + imageUrl + ')';
    document.documentElement.style.backgroundSize = 'cover';
    document.documentElement.style.backgroundRepeat = 'no-repeat';
    document.documentElement.style.backgroundPosition = 'center center';

};
img.src = imageUrl;
window.onload = setBackground();


async function getLocation(city) {
    const responseWeather = await fetch(weatherUrl + city + `&cnt=5` + `&appid=${weatherKey}`);

    let data = await responseWeather.json();

    if (responseWeather.status == 404) {
        alert("Wrong city name");
    }

    else {
        console.log(data);

        // weather
        document.querySelector("#celsius").innerHTML = Math.round(data.list[0].main.temp) + "°c";

        document.querySelector(".days2").innerHTML = daysOfWeek[(current.getDay() + 1) % 7];
        document.querySelector(".days3").innerHTML = daysOfWeek[(current.getDay() + 2) % 7];
        document.querySelector(".days4").innerHTML = daysOfWeek[(current.getDay() + 3) % 7];
        document.querySelector(".days5").innerHTML = daysOfWeek[(current.getDay() + 4) % 7];

        setWeatherIcon(data.list[0].weather[0], weatherIcon1);
        setWeatherIcon(data.list[1].weather[0], weatherIcon2);
        setWeatherIcon(data.list[2].weather[0], weatherIcon3);
        setWeatherIcon(data.list[3].weather[0], weatherIcon4);
        setWeatherIcon(data.list[4].weather[0], weatherIcon5);

        document.querySelector(".temp1").innerHTML = Math.round(data.list[0].main.temp_min) + " / " + Math.round(data.list[0].main.temp_max);
        document.querySelector(".temp2").innerHTML = Math.round(data.list[1].main.temp_min) + " / " + Math.round(data.list[1].main.temp_max);
        document.querySelector(".temp3").innerHTML = Math.round(data.list[2].main.temp_min) + " / " + Math.round(data.list[2].main.temp_max);
        document.querySelector(".temp4").innerHTML = Math.round(data.list[3].main.temp_min) + " / " + Math.round(data.list[3].main.temp_max);
        document.querySelector(".temp5").innerHTML = Math.round(data.list[4].main.temp_min) + " / " + Math.round(data.list[4].main.temp_max);
        //weather



    }

}


var x = setInterval(function () {
    // time, date formats
    let forDate;
    let hours = current.getHours();
    let ampm = (hours >= 12) ? "PM" : "AM";
    hours = (hours >= 12) ? hours - 12 : hours;
    let minutes = current.getMinutes();
    let seconds = current.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (current.getDate() == "1" || current.getDate() == "21" || current.getDate() == "31") {
        forDate = "st";
    }
    else if (current.getDate() == "2" || current.getDate() == "22") {
        forDate = "nd";
    }
    else if (current.getDate() == "3" || current.getDate() == "23") {
        forDate = "rd";
    }
    else {
        forDate = "th";
    }

    document.querySelector("#currentTime").innerHTML = hours + ' : ' + minutes;
    document.querySelector("#currentDate").innerHTML = daysOfWeekFull[current.getDay()] + ", " + current.getDate() + forDate + "&nbsp&nbsp" + monthNames[current.getMonth()];
    document.querySelector("#currentYear").innerHTML = current.getFullYear();
    document.querySelector("#ampm").innerHTML = ampm;
    createCalendar(currentYear, currentMonth, current.getDate());

});
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

    if (iconMapping.hasOwnProperty(weatherMain)) {
        element.src = "images/icons/" + iconMapping[weatherMain];
    }
    else {
        element.src = "images/icons/questionMark.png";
    }
}

test = "vancouver";
getLocation(test);

//pop up
function openPopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.zIndex = '2';
    overlay.style.display = 'block';
    popup.style.animation = 'scaleIn 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    popup.style.display = 'block';
}
function closePopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.animation = 'scaleOut 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    setTimeout(function () {
        popup.style.display = 'none';
    }, 200);
    overlay.style.display = 'none';
}

document.querySelector('#notePopup button').addEventListener('click', () => {
    document.getElementById('note').value = document.getElementById('notes').value;
});

// note
$(document).ready(() => {
    if ($.localStorage.isSet('note')) {
        $('#notes').val($.localStorage.get('note'));
        $('#note').val($.localStorage.get('note'));
    }

    $('#noteBtn').click(() => {
        $.localStorage.set('note', $('#notes').val());
        //   alert('Saved');
    })
})

// set note
document.getElementById('note').addEventListener('click', () => {
    var popup = document.getElementById("notePopup");
    popup.style.zIndex = '2';
    overlay.style.display = 'block';
    popup.style.animation = 'scaleIn 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    popup.style.display = 'block';
    document.getElementById('notes').focus();
});

// set background
document.querySelector('#settingBtn').addEventListener('click', () => {
    backgroundNum = parseInt(document.getElementById('imgNum').value);
    backgroundType = document.getElementById('imgFormat').value;
    console.log(backgroundNum + ' ' + backgroundType);
    setBackground();
    closePopup("settingPopup");
});

// set weather
document.querySelector('#weatherBtn').addEventListener('click', () => {
    const getCity = document.getElementById('city').value;
    getLocation(getCity);
    closePopup("weatherPopup");
});

document.querySelector('#stockBtn').addEventListener('click', () => {

});