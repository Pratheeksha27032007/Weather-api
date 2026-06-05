// import dotenv from "dotenv";
// dotenv.config();
const key =  "YOUR_API_KEY";
const url =`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${key}&format=json`;
// &q=bengaluru
// &num_of_days=1
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatTime(time) {
    time = time.padStart(4, "0");
    return `${time.slice(0,2)}:${time.slice(2)}`;
}
async function rewrite(place){
     if(place){
        place=place.trim().toLowerCase();
        document.querySelector(".today-weather").innerHTML=""
       await API_CALL(place);
        document.querySelector("#place").innerText=capitalize(place);      
    }
}
let place="bengaluru";
const btn=document.querySelector(".change");
btn.addEventListener("click",async ()=>{
    const placee=document.querySelector("#place");
    placee.innerHTML=`
    <form id="cityForm">
         <input type="text" id="input">
        <button id="search">Search</button>
    </form>
    `
    const form = document.querySelector("#cityForm");

    form.addEventListener("submit",async (e) => {
    e.preventDefault(); // prevents page refresh
     const city = document.querySelector("#input").value;

    console.log(city); // output in console
    await rewrite(city)
    // Example
  //  document.querySelector("#output").innerText =`You searched for ${city}`;
    });
   
});




const API_CALL=async (place)=>{
response = await fetch(`${url}&q=${place}&num_of_days=1`);
data = await response.json();
console.log(data.data);
// console.log(data.data.current_condition[0].temp_C)
let imgURL=data.data.current_condition[0].weatherIconUrl[0].value;
//current-weather
document.querySelector(".current-weather").lastElementChild.innerText="Temprature : "+ data.data.current_condition[0].temp_C+"°C";
document.querySelector(".current-weather").firstElementChild.firstElementChild.src=imgURL;
document.querySelector(".current-weather").firstElementChild.lastElementChild.innerText=data.data.current_condition[0].weatherDesc[0].value;

const todayWeather=document.querySelector(".today-weather");
const hourly = data.data.weather[0].hourly;
hourly.forEach(hour => {
    const card = document.createElement("div");
    card.classList.add("hour-card");
    card.innerHTML = `
        <div><img src="${hour.weatherIconUrl[0].value}">
        <p>${hour.weatherDesc[0].value}</p></div>
        <hr>
        <p>${hour.tempC}°C</p>
        <h4>${formatTime(hour.time)}</h4>
    `;
    todayWeather.appendChild(card);
});
const extra=document.querySelector(".extra");
const info=data.data.current_condition[0]
extra.innerHTML=`
    <p>Humidity : ${info.humidity}</p> <hr>
    <p>Precipitation (in mm) : ${info.precipMM} mm</p> <hr>
    <p>Wind direction : ${info.winddirDegree} °</p> <hr>
    <p>Wind Speed(Kmph) : ${info.windspeedKmph} Kmph    </p>
`
}
API_CALL(place);

//header
const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
});
const placeandtime=document.querySelector(".place-and-time");
placeandtime.firstElementChild.innerText=capitalize(place);
placeandtime.lastElementChild.innerText=currentTime;
const day = new Date().toLocaleDateString("en-US", {
    weekday: "long"
});
const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
});
document.querySelector(".date-and-day").firstElementChild.innerText=date;
document.querySelector(".date-and-day").lastElementChild.innerText=day;


