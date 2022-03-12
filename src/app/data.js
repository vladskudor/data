const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/");

let dbClient;

// настройка CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();  // передаем обработку запроса дальше
});

mongoClient.connect(function(err, client){
  if(err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db("usersdb").collection("users");
  app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
  });
});

app.get("/api/users", function(req, res){

  const collection = req.app.locals.collection;
  collection.find({}).toArray(function(err, users){

    if(err) return console.log(err);
    res.send(users)
  });

});
app.get("/api/users/:id", function(req, res){

  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOne({_id: id}, function(err, user){

    if(err) return console.log(err);
    res.send(user);
  });
});

app.post("/api/users", jsonParser, function (req, res) {

  if(!req.body) return res.sendStatus(400);

  const userLogin = req.body.email;
  const userPassword = req.body.password;
  const userImg = req.body.img;
  const user = {email: userLogin, password: userPassword , img: userImg};

  const collection = req.app.locals.collection;
  collection.insertOne(user, function(err, result){

    if(err) return console.log(err);
    res.send(user);
  });
});

app.delete("/api/users/:id", function(req, res){

  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOneAndDelete({_id: id}, function(err, result){

    if(err) return console.log(err);
    let user = result.value;
    res.send(user);
  });
});

app.put("/api/users", jsonParser, function(req, res){

  if(!req.body) return res.sendStatus(400);
  const id = new objectId(req.body._id);
  const userLogin = req.body.email;
  const userPassword = req.body.password;

  const collection = req.app.locals.collection;
  collection.findOneAndUpdate({_id: id}, { $set: {email: userLogin, password: userPassword}},
    {returnOriginal: false },function(err, result){

      if(err) return console.log(err);
      const user = result.value;
      res.send(user);
    });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});
