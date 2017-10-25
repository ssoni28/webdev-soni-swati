
module.exports = function (app) {

  app.post("/api/user", createUser);
  app.get("/api/user?username=username", findUserByUsername);
  app.get("/api/user?username=username&password=password", findUserByCredentials);
  app.get("/api.user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);


  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }

  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    var requiredUser = users.find(function(user){
      return (user.username === username && user.password === password);

    });
    res.json(requiredUser);
  }

  function createUser(req, res) {
    var user = req.body;
    user._id = Math.random().toString();
    this.users.push(user);
    res.json(user);
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var updatedUser = req.body;
    for (var u in this.users) {
      if (this.users[u]._id === req.params["userId"]) {
       users[u] == updatedUser;
       res.json(users);
      }
    }
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    for (var u in this.users) {
      if (this.users[u]._id === userId) {
        var y = +u;
        this.users.splice(y, 1);
      }
    }
    res.json(users);
  }

  function findUserByUsername(req, res) {
    var username = req.query["username"];
    var requiredUser = users.find(function(user) {
      return user.username === username;
    });
    res.json(requiredUser);
  }

};


