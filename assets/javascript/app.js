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

 var trainName = "";
 var destination = "";
 var firstTrainTime = "";
 var frequency = "";

 var currentTime = moment();

 $("#addTrain").on("click", function(event) {
     event.preventDefault();
     console.log("submit button clicked!");
     trainName = $("#trainInput").val().trim();
     console.log(trainName);
     destination = $("#destinationInput").val().trim();
     console.log(destination);
     firstTrainTime = $("#firstTrain").val().trim();
     console.log(firstTrainTime);
     frequency = parseInt($("#frequencyInput").val().trim());
     console.log(frequency);

     firebase.database().ref().push({
         trainName: trainName,
         destination: destination,
         firstTrainTime: firstTrainTime,
         frequency: frequency
         
     })
 })

 firebase.database().ref().on("child_added", function(snapshot) {
     
     var train = snapshot.val().trainName;
     var destination = snapshot.val().destination;
     var firstTrain = snapshot.val().firstTrainTime;
     var freq = parseInt(snapshot.val().frequency);


     var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
     console.log(firstTimeConverted);

     
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

     
     var diffTime = parseInt(moment().diff(moment(firstTimeConverted), "minutes"));
     console.log("DIFFERENCE IN TIME: " + diffTime);

     
     var tRemainder = diffTime % freq;
     console.log(tRemainder);

     
     var tMinutesTillTrain = freq - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     var nextArrival = moment(nextTrain).format("hh:mm");

     // var keys = ["trainName", "destination", "frequency"];
     // var row = $("<tr>");

     // for (var i = 0; i < keys.length; i++) {

     // 	var cell = $("<td>");
     // 	// var key = "trainName";

     // 	cell.text(snapshot.val()[keys[i]]);
     // 	// cell.text(snapshot.val()["trainName"]);

     // 	row.append(cell);
     // 	$("#trainTable").append(row);

     // }
     $("#trainTable > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + freq + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");

 })