var myMap;
var canvas;
var mappa = new Mappa('MapboxGL', 'pk.eyJ1Ijoic3ViamVjdG5hbWVoZXJlIiwiYSI6ImNqcDA3NzYwOTAzY2UzcXA2bHQ3a2Q4cGcifQ.xY4-PF7rtw8pkh3w63DLjA');

var date, hours, minutes, seconds;
var position;
var myLat;
var myLon;

var bovisaLat;
var bovisaLon;

var villapizzoneLat;
var villapizzoneLon;

var derganoLat;
var derganoLon;


function preload() {
  position = getCurrentPosition();
}

function setup() {
  noCanvas();

  //set parameters for longitude and latitude
  var options = {
    lat: position.latitude,
    lng: position.longitude,
    zoom: 17,
    style: "mapbox://styles/subjectnamehere/cjp0731eues9k2rp6qwvmgqo2",
  }

  var myLat = position.latitude;
  var myLon = position.longitude;

  //create your map
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  //update your position once every second
  intervalCurrentPosition(showPosition, 1000);
}

function draw() {
  clear();

  //set the coordinates of your position and the train stations
  myLat = position.latitude;
  myLon = position.longitude;

  var bovisaLat = 45.5029445;
  var bovisaLon = 9.1582864;

  var villapizzoneLat = 45.5020619;
  var villapizzoneLon = 9.1487293;

  var derganoLat = 45.5056448;
  var derganoLon = 9.1775988;

  //convert the coordinates into pixel coordinates
  var myPosition = myMap.latLngToPixel(myLat, myLon);

  var bovisaPosition = myMap.latLngToPixel(bovisaLat, bovisaLon);
  var villapizzonePosition = myMap.latLngToPixel(villapizzoneLat, villapizzoneLon);
  var derganoPosition = myMap.latLngToPixel(derganoLat, derganoLon);

  //find the distance between your position and each station
  var bovisaDistance = calcGeoDistance(myLat, myLon, bovisaLat, bovisaLon, 'km');
  var villapizzoneDistance = calcGeoDistance(myLat, myLon, villapizzoneLat, villapizzoneLon, 'km');
  var derganoDistance = calcGeoDistance(myLat, myLon, derganoLat, derganoLon, 'km');

  //mark the stations
  push();
  noStroke();
  fill('rgba(100%,100%,100%,0.5)');
  ellipse(myPosition.x, myPosition.y, 40);
  ellipse(myPosition.x, myPosition.y, 15);

  fill('rgba(0%,100%,100%,0.5)');
  ellipse(bovisaPosition.x, bovisaPosition.y, 30);
  ellipse(bovisaPosition.x, bovisaPosition.y, 15);

  fill('rgba(100%,100%,0%,0.5)');
  ellipse(villapizzonePosition.x, villapizzonePosition.y, 30);
  ellipse(villapizzonePosition.x, villapizzonePosition.y, 15);

  fill('rgba(100%,0%,100%,0.5)');
  ellipse(derganoPosition.x, derganoPosition.y, 30);
  ellipse(derganoPosition.x, derganoPosition.y, 15);
  pop();

  //find the closest station
  push();
  fill('white');
  textSize(30);
  stroke('white');
  if (bovisaDistance < villapizzoneDistance && bovisaDistance < derganoDistance) {
    line(myPosition.x, myPosition.y, bovisaPosition.x, bovisaPosition.y);
    text('Closest train station: ' + bovisaDistance + ' km', width / 20, width / 20);
  }

  if (villapizzoneDistance < bovisaDistance && villapizzoneDistance < derganoDistance) {
    line(myPosition.x, myPosition.y, villapizzonePosition.x, villapizzonePosition.y);
    text('Closest train station: ' + villapizzoneDistance + ' km', width / 20, width / 20);
  }

  if (derganoDistance < villapizzoneDistance && derganoDistance < bovisaDistance) {
    line(myPosition.x, myPosition.y, derganoPosition.x, derganoPosition.y);
    text('Closest train station: ' + derganoDistance + ' km', width / 20, width / 20);
  }
  pop();

  //create loading screen
  if (frameCount < 200) {
    push();
    fill('black');
    rect(0, 0, width, height);
    fill('white');
    textAlign(CENTER);
    textSize(32);
    text('Quick! You must escape PoliMi! Which is the fastest route?', width / 2, height / 2);
    strokeWeight(10);
    stroke(150);
    line(width / 2 - 100, height / 2 + 50, width / 2 + 100, height / 2 + 50);
    stroke(255);
    line(width / 2 - 100, height / 2 + 50, width / 2 - 100 + frameCount, height / 2 + 50);
    pop();
  }
}

function showPosition(position) {
  myLat = position.latitude;
  myLon = position.longitude;
}
