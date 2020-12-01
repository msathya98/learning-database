

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitDb', {useNewUrlParser: true});


const fruitSchema = new mongoose.Schema ({
  name:{
   type: String,
   //required: [true, 'check you data entry, Name is not specified']
  },
  rating:{
    type: Number,
    min: 1,
    max: 10
  }, 
  review: String

});

const Fruit = mongoose.model("fruit", fruitSchema);

const Pineapple = new Fruit ({
  name: "Pineapple",
  rating: 8,
  review: "very good "

});

Pineapple.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favFruit: fruitSchema

});

const Person = mongoose.model("person", personSchema);

/*const person = new Person ({
  name: "Jhon",
  age: 27,
 favFruit: Pineapple

});*/

const person = new Person ({
  name: "kushal",
  age: 27,
 favFruit: Pineapple

});


person.save();

/* const Kiwi = new Fruit ({
  name: "Kiwi",
  rating: 10,
  review: "pretty good goog "

});

const Orange = new Fruit ({
  name: "orange",
  rating: 7,
  review: "ashtralle "

});

const Banana = new Fruit ({
  name: "banana",
  rating: 8,
  review: "digesting fruit "

});

Fruit.insertMany([ Kiwi, Orange, Banana], 
  function(err){
    if(err){
      console.log("err");
    } else{
      console.log("sucessfully added");

    }
  });*/

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  } else {
    mongoose.connection.close();

    fruits.forEach(function(fruit){
   
    console.log(fruit.name);
  })
}
});

/* Person.deleteMany({name: "Jhon"}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("sucessfully deleted the docs");
  }

})

/*Fruit.updateOne({_id: "5fc643df43b8600acc31fe99"}, {name: "scach"}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("sucessfully completed the docs");
  }
}); */


const findDocuments = function(db, callback){
  const collection = db.collection('fruits');

  collection.find({}).toArray(function(err, fruits){
    assert.equal(err, null);
    console.log("found the following");
    console.log(fruits)
    callback(fruits);
  });
}
