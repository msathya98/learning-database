
	var today = new Date();

	if (today.getDay() === 6 || today.getDay() === 0){
		display("<h1>yey it is a weekend<h1>");
	}else{
		display("bro I have to Work");
	}




const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
//app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	var today = new Date();
	var currentDay = today.getDay();
    var day = "";

	if (currentDay === 0 ){
		day = "Sunday";
	} else if (currentDay === 1){
		day = "Monday";
	} else if (currentDay === 2 ){
		day = "Tuesday";
		} else if (currentDay === 3 ){
		day = "Wednesday";
		} else if (currentDay === 4 ){
		day = "Thursday";
							
			} else if (currentDay === 5 ){
		day = "Friday";
		} else if (currentDay === 6 ){
		day = "Saturday";
							
	}; //we can ALSO use switch statement here

res.render("list", {KindOfDay: day});

});


app.listen(3000, function(){
	console.log("server started");
});



<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>To Do List</title>
</head>
<body>

	<% if(KindOfDay === "Thursday") { %>
<h1 style = "color: purple"> <% KindOfDay %> ToDo List </h1>
<% } else { %>

	<h1 style = "color: red">It's a <%= KindOfDay %> ToDo List</h1>
<% } %>
	
</body>
</html>