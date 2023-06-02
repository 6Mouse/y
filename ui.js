let season = "summer"
let weather = "none"
let create = "grass"
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
function changeCreateGrass(){
    create = "Grass"
    console.log("grass")
}
function changeCreateGrassEater(){
    create = "Eater"
    console.log("grass eater")
}
function changeCreateGrassEater1(){
    create = "Eater1"
    console.log("grass eater1")
}
function changeCreateGrassEater2(){
    create = "Eater2"
    console.log("grass eater2")
}
function changeCreateGrassEater3(){
    create = "Eater3"
    console.log("grass eater3")
}
function changeCreateGrassEater4(){
    create = "Eater4"
    console.log("grass eater4")
}
function changeToKill(){
    create = "kill"
    console.log("killing")
}

let winter = document.getElementById("winter")
winter.addEventListener("click", changeSeasonWinter)
let summer = document.getElementById("summer")
summer.addEventListener("click", changeSeasonSummer)
let storm = document.getElementById("storm")
storm.addEventListener("click", changeWeatherStorm)
let createGrass = document.getElementById("grass")
createGrass.addEventListener("click", changeCreateGrass)
let createGrassEater = document.getElementById("grassEater")
createGrassEater.addEventListener("click", changeCreateGrassEater)
let createGrassEater1 = document.getElementById("grassEater1")
createGrassEater1.addEventListener("click", changeCreateGrassEater1)
let createGrassEater2 = document.getElementById("grassEater2")
createGrassEater2.addEventListener("click", changeCreateGrassEater2)
let createGrassEater3 = document.getElementById("grassEater3")
createGrassEater3.addEventListener("click", changeCreateGrassEater3)
let createGrassEater4 = document.getElementById("grassEater4")
createGrassEater4.addEventListener("click", changeCreateGrassEater4)
let kill = document.getElementById("kill")
kill.addEventListener("click", changeToKill)