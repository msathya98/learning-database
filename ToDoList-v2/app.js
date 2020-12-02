const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema ({
	name: String
})

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
	name: "hi welcome to todolist page"
});

const item2 = new Item({
	name: "Hit the + button to add new item"
});

const item3 = new Item({
	name: "<-- hit this to delete the item"
})
 
 const defaultItems = [item1, item2, item3];

const listSchema = {
	name: String,
	items: [itemsSchema]
};

const List = mongoose.model("list", listSchema);

/* */




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

Item.find({ }, function(err, foundItems){

	if( foundItems.length === 0){
		Item.insertMany(defaultItems, function(err){
	if(err){
		console.log(err);
		}
		else{
			console.log("items are added!")
		}
	
});
		res.redirect("/");

	} else{
		res.render("list", {listTitle: "Today", newlistItems: foundItems});
	}
	
});
});


app.post("/", function(req,res){

	const itemName = req.body.newItem;
	const listName = req.body.list;

	const item = new Item({
		name: itemName
	});

	if (listName === "Today"){

	item.save();
     res.redirect("/");	
	
	}else {
		List.findOne({name: listName}, function(err, foundList){
			foundList.items.push(item);
			foundList.save();
			res.redirect("/" + listName);
		})
	}
	
});

app.post("/delete", function(req, res){
 checkedItemId = req.body.checkbox;
	Item.deleteOne({_id: checkedItemId}, function(err){
		if(err){
			console.log(err);
		} else{
           console.log("sucesfully deleted");
		}
	})
	res.redirect("/");
});

app.get("/:customListName", function(req,res){
	const customListName = req.params.customListName;

	
	List.findOne({name: customListName}, function(err, foundItems){
		if(foundItems){
			res.render("list", {listTitle: foundItems.name, newlistItems: foundItems.items});
		} else{
           const list = new List({
       name: customListName,
       items: defaultItems
	});
           list.save();
           res.redirect("/" + customListName);
		}
		
	}) 

	

});

app.get("/about", function(req, res){
	res.render("about");
})

app.post("/work", function(req, res){
	let item = req.params.work;
	workItems.push(item);
	res.redirect("/work");
});


app.listen(3000, function(){
	console.log("server started");
});
