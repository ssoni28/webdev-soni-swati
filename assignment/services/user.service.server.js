/**
 * Created by swatisoni
 * @param app
 */
module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  app.post("/api/user", createUser);
  app.put("/api/user/:userId", updateUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUser);
  app.delete("/api/user/:userId", deleteUser);

  function findUserById(req, res) {

    var userId = req.params["userId"];
    userModel
      .findUserById(userId)
      .then(function(user) {
        if(user) {
          res.json(user);
        } else{
          res.json({});
        }
      });
    /*var user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);*/
  }

  function findUserByCredentials(username, password) {

    var promise = userModel.findUserByCredentials(username, password);
    promise.then(function(user){
      res.json(user);
      console.log(user);
    });

    /*  var requiredUser;
      for (const x in users) {
        if (users[x].username === username && users[x].password === password) {
          requiredUser = users[x];
          return requiredUser;
        }
      }*/
  }

  function createUser(req, res) {
    const user = req.body;
    userModel
      .createUser(user)
      .then(function (user){
        res.json(user);
      });
  }
  /* user._id = Math.random().toString();
   users.push(user);
   res.json(user);*/


  function updateUser(req, res) {
    var updatedUser = req.body;
    var userId = req.params["userId"];
    userModel
      .updateUser(userId, updatedUser)
      .then(function (updatedUser) {
        res.json(updatedUser);
      });
   /* for (var u in users) {
      if (users[u]._id === userId) {
        users[u].username = updatedUser.username;
        users[u].firstName = updatedUser.firstName;
        users[u].lastName = updatedUser.lastName;
        users[u].email = updatedUser.email;
      }
    }
    res.json(updatedUser);*/
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel
      .deleteUser(userId)
      .then(function (user) {
        res.json(user);
      });
    /*for (var u in users) {
      if (users[u]._id === userId) {
        var y = +u;
        users.splice(y, 1);
      }
    }
    res.json(users);*/
  }

  function findUserByUsername(username) {
    userModel
      .findUserByUsername(username)
      .then(function(user){
        res.json(user);
        console.log(user);
      });
    /*for (var x = 0; x < users.length; x++) {
      if (users[x].username === username) {
        return users[x];
      }
    }
    return null;*/
  }

  function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if((username) && (password)) {
      var promise = userModel.findUserByCredentials(username, password);
      promise.then(function(user){
        res.json(user);
        console.log(user);
      });
      return;

      //res.json(findUserByCredentials(username, password));
    } else if(username) {
      userModel
        .findUserByUsername(username)
        .then(function(user){
          res.json(user);
          console.log(user);
        });
      return;
      // res.json(findUserByUsername(username));
    } else {
      res.status(404).send({error: "Not found"});
    }
  }
};
