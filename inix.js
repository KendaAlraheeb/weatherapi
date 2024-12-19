

// // ////////////////////////////1///////////////////////////
// const dayName =document.getElementById("dayName");
// const dayNumber =document.getElementById("dayNumber");
// const todayMonthOfcity =document.getElementById("todayMonthOfcity");

// const todayLocation =document.getElementById("todayLocation");
// const todayTemp =document.getElementById("todayTemp");
// const todayConditionImg =document.getElementById("todayConditionImg");
// const todayText =document.getElementById("todayText");

// const todayHumidity =document.getElementById("todayHumidity");
// const todayWind =document.getElementById("todayWind");
// const todayWindDirection =document.getElementById("todayWindDirection");

// // ////////////////////////////////2////////////////////////////////

// const nextDayName =document.getElementById("nextDayName");

// const nextConditionImg =document.getElementById("nextConditionImg");
// const nextMaxTemp =document.getElementById("nextMaxTemp");
// const nextMinTemp =document.getElementById("nextMinTemp");
// const nextConditionText =document.getElementById("nextConditionText");

// // //////////////////////////////////////////////////////////////

// const afterNextDayName =document.getElementById("afterNextDayName");

// const afterNextConditionImg =document.getElementById("afterNextConditionImg");
// const afterNextMaxTemp =document.getElementById("afterNextMaxTemp");
// const afterNextMinTemp =document.getElementById("afterNextMinTemp");
// const afterNextConditionText =document.getElementById("afterNextConditionText");

// // ////////////////////////////////////////////////////////////////////////
// const searchLocationInput =document.getElementById("searchLocationInput");


// navigator.geolocation.getCurrentPosition( (position)=>{
//     console.log(position.coords);
//     let myLatitude =position.coords.latitude;
//     let myLongitude =position.coords.longitude;
//     getWeatherData(`${myLatitude}.${myLongitude}`)
// });

// async function getWeatherData(query) {
//     let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&aqi=no&alerts=no`);
//     let data =await res.json();
//     console.log(data);
    
// }







//////////////////////
const findLocation = document.getElementById('findLocation')

findLocation.addEventListener('input',function(e){
console.log(e.target.value)
getDataApi(e.target.value)
})



async function getDataApi(cityName){
if(cityName.length>2){
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=62162d74ff324b0caaa22640240912`)
    let data = await res.json()
    console.log(data)
    displayData(data)

}
}


function displayData(data){

let dateToday = new Date(data.current.last_updated)
console.log(dateToday.getDate())
document.getElementById('todayName').innerHTML =  dateToday.toLocaleString('en-us',{weekday:'long'});
document.getElementById('todayDate').innerHTML = dateToday.getDate()+' '+dateToday.toLocaleString('en-us',{month:'long'})
document.getElementById('location').innerHTML = data.location.name;
document.getElementById('todayTemp').innerHTML = data.current.temp_c;
document.getElementById('todayIcon').setAttribute('src',`https:${data.current.condition.icon}`)
document.getElementById('todayCondition').innerHTML = data.current.condition.text;
document.getElementById('humidity').innerHTML = data.current.humidity+'%';
document.getElementById('wind-speed').innerHTML = data.current.wind_kph+'km/h';
document.getElementById('wind-dir').innerHTML =data.current.wind_dir;

let cartoona =""
for (let i=1;i<=2;i++){
let dateNext = new Date (data.forecast.forecastday[i].date)
console.log(dateNext)
cartoona = `<div class="forecast-card p-4 rounded-3  ${i==1?'bg-custom-two':'bg-custom'} text-white text-center h-100">
    <div class="day">${dateNext.toLocaleString('en-us',{weekday:'long'})}</div>
    <img src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="" width="90">
    <div class="fs-1">${data.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
    <div class="fs-1">${data.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</div>

    <div class="text-primary">${data.forecast.forecastday[i].day.condition.text}</div>
    </div>` 
    document.querySelectorAll('.card-days')[i-1].innerHTML = cartoona
}

}
console.log(document.querySelectorAll('.card-days'))

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(pos){
    console.log(pos)
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;
    getDataApi(`${lat},${lon}`)
  })
}

const links = document.querySelectorAll('.nav-link');
console.log(links)

for(let i = 0;i<links.length;i++){
links[i].addEventListener('click',function(e){
    e.preventDefault()
    links.forEach(function(link){
    link.classList.remove('active')
    })
    links[i].classList.add('active');
    
    })
}

