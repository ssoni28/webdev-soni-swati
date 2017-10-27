/**
 * Created by swatisoni
 * @param app
 */
module.exports = function (app) {

  app.post("/api/user", createUser);
  app.put("/api/user/:userId", updateUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUser);
  app.delete("/api/user/:userId", deleteUser);

  var users = [
    {_id: '123', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonder'},
    {_id: '234', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley'},
    {_id: '345', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia'},
    {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi'}
  ];

  function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }

  function findUserByCredentials(username, password) {

    var requiredUser;
    for (const x in users) {
      if (users[x].username === username && users[x].password === password) {
        requiredUser = users[x];
        return requiredUser;
      }
    }
  }

  function createUser(req, res) {
    var user = req.body;
    user._id = Math.random().toString();
    users.push(user);
    res.json(user);
  }

  function updateUser(req, res) {
    var updatedUser = req.body;
    var userId = updatedUser._id;
    for (var u in users) {
      if (users[u]._id === userId) {
        users[u] == updatedUser;
      }
    }
    res.json(users);
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    for (var u in users) {
      if (users[u]._id === userId) {
        var y = +u;
        users.splice(y, 1);
      }
    }
    res.json(users);
  }

  function findUserByUsername(username) {
    for (var x = 0; x < users.length; x++) {
      if (users[x].username === username) {
        return users[x];
      }
    }
    return null;
  }

  function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if((username) && (password)) {
      res.json(findUserByCredentials(username, password));
    } else if(username) {
      res.json(findUserByUsername(username));
    } else {
      res.status(404).send({error: "Not found"});
    }
  }
};
