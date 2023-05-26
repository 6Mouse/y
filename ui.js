let season = "summer"
let weather = "none"
function changeSeasonWinter(){
    season = "winter"
    console.log("winter")
}
function changeSeasonSummer(){
    season = "summer"
    console.log("summer")
}
function changeWeatherStorm(){
    weather = "storm"
    console.log("storm")
}

let winter = document.getElementById("winter")
winter.addEventListener("click", changeSeasonWinter)
let summer = document.getElementById("summer")
summer.addEventListener("click", changeSeasonSummer)
let storm = document.getElementById("storm")
storm.addEventListener("click", changeWeatherStorm)