const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const articleSchema = new mongoose.Schema({
	title: String,
	content: String
});

const Article = mongoose.model("article", articleSchema);


app.route("/articles")

.get( function(req, res){


Article.find({ }, function(err, foundThings){
	if(!err){
		res.send(foundThings);
	}
})
})

.post(function(req, res){
	console.log(req.body.title);
	console.log(req.body.content);
const newArticle = new Article({
	title: req.body.title,
	content: req.body.content
});

newArticle.save(function(err){
	if(!err){
		res.send("succesfully added a new article");
	}
});
})

.delete(function(req, res){
	Article.deleteMany(function(err){
		if(!err){
			res.send("All Deleted succesfully");
		} else{
			res.send(err);
		}
	})
})


/////////////////////////////////////////////////////////////

app.route("/articles/:articleTitle")

.get( function(req, res){


Article.find({title: req.params.articleTitle }, function(err, foundThing){
	if(foundThing){
		res.send(foundThing);
	} else{
		res.send("no such a article found");
	}
})
})

.put(function(req, res){
	Article.update(
	{title: req.params.articleTitle},
	{title: req.body.title, content: req.body.content},
	{overwrite: true},
	function(err){
		if(!err){
			res.send("sucessfully updated article");
		}

	}
    )
	})

.patch(function(req, res){
	Article.update(
	{title: req.params.articleTitle},
	{$set: req.body},
	
	function(err){
		if(!err){
			res.send("sucessfully updated article");
		} else{
			res.send(err);

		}

	}
    )
	})

.delete(function(req, res){
	Article.deleteOne(
			{title: req.params.articleTitle},
	
	function(err, deleted){
		if(!err){
			res.send("sucessfully updated article");
		} else{
			res.send(err);

		}

	}
    )
	});



app.listen(3000, function(){
	console.log("server has started");
});
