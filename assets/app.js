// Initialize Firebase
var config = {
    apiKey: "AIzaSyBMNLox52dXaPA1BZbnI6dOusvEehQ7HLM",
    authDomain: "train-scheduler-b1a8e.firebaseapp.com",
    databaseURL: "https://train-scheduler-b1a8e.firebaseio.com",
    projectId: "train-scheduler-b1a8e",
    storageBucket: "train-scheduler-b1a8e.appspot.com",
    messagingSenderId: "675149744582"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();



$("#addTrainBtn").on("click", function(){

  event.preventDefault();  

  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrainUnix = moment($("#timeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequencyInput").val().trim();

  
  var newTrain = {
    name:  trainName,
    destination: destination,
    firstTrain: firstTrainUnix,
    frequency: frequency
  }

  
  trainData.ref().push(newTrain);

  
  

  // Alert
  alert(newTrain.name + " has been successfully added");

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");

 
});

trainData.ref().on('child_added', function(childSnapshot){

  console.log(childSnapshot.val().name);

  let data = childSnapshot.val();
    let tName = data.name;
  let tDestination = data.destination;
  let tFrequency = data.frequency;
  let tFirstTrain = data.firstTrain;
  
  let differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  let tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
  let tMinutes = tFrequency - tRemainder;

 
  let tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
  
  $("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td id='min'>" + tFrequency + "</td><td id='min'>" + tArrival + "</td><td id='min'>" + tMinutes + "</td></tr>");



});



//Sort function