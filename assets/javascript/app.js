 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCkZXS3TXXm7Kf8_3Zyq50H8ZORkcsy9O4",
    authDomain: "traintime-11c2d.firebaseapp.com",
    databaseURL: "https://traintime-11c2d.firebaseio.com",
    projectId: "traintime-11c2d",
    storageBucket: "",
    messagingSenderId: "21372477156"
  };
  
  firebase.initializeApp(config);

  // var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";
  
  var currentTime = moment();
  

  $("#addTrain").on("click",function(event){
  	event.preventDefault();
  		console.log("submit button clicked!");
  	trainName = $("#trainInput").val().trim();
  		console.log(trainName);
  	destination = $("#destinationInput").val().trim();
  		console.log(destination);
  	firstTrainTime = $("#firstTrain").val().trim();
  		console.log(firstTrainTime);
  	frequency = $("#frequencyInput").val().trim();
  		console.log(frequency);

  	firebase.database().ref().push({
  		trainName:trainName,
  		destination: destination,
  		firstTrainTime:firstTrainTime,
  		frequency:frequency
  		// dateAdded:firebase.database.ServerValue.TIMESTAMP
  	})
  })

  firebase.database().ref().on("child_added",function(snapshot){
  	$("#trainDisplay").html("<td>"+snapshot.val().trainName+"</td>");
  		console.log("trainName = " + snapshot.val().trainName);
  	$("#destinationDisplay").html("<td>"+snapshot.val().destination+"</td>");
  		console.log("destination = " +snapshot.val().destination);
  	$("#frequencyDisplay").html("<td>"+snapshot.val().frequency+"</td>");
  		console.log("frequency = " +snapshot.val().frequency);
  	$("#nextArrivalDisplay").html("<td>"+currentTime+"</td>");
  		console.log("nextArrivalDisplay = " +currentTime);
  })