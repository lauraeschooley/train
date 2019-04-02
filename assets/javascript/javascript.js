$(document).ready(function() {
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_BQlh6uVRLIZCX3HZ3efcp_2SEH100vQ",
    authDomain: "train-633cd.firebaseapp.com",
    databaseURL: "https://train-633cd.firebaseio.com",
    projectId: "train-633cd",
    storageBucket: "train-633cd.appspot.com",
    messagingSenderId: "614086238722"
};
firebase.initializeApp(config);

var database = firebase.database();



$("#add-train-btn").on("click", function(event) {

event.preventDefault();

//Grabs utrain inputs

var trainName = $("#train-name-input").val().trim();
var destination = $("#destination-input").val().trim();
var startTime = $("#start-time-input").val().trim();
var frequency = $("#frequency-input").val().trim();

console.log(trainName);
console.log(destination);
console.log(startTime);
console.log(frequency);

//creates local "temp" object for holding train date

var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: startTime,
    freq: frequency

};

//upload info to database

database.ref().push(newTrain); 


});

database.ref().on("child_added", function(childSnapshot){

//store everything in a variable

var trainName = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
var startTime = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().freq;


// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var newRow = $("<tr>").append(

    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(moment(nextTrain).format("hh:mm A")),
    $("<td>").text(tMinutesTillTrain)

);

$("#train-table >tbody").append(newRow);

});



  

});