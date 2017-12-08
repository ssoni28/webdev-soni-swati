/**
 * Created by swatisoni
 * @param app
 */
module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;

  app.post("/api/user", createUser);
  app.put("/api/user/:userId", updateUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUser);
  app.delete("/api/user/:userId", deleteUser);
  app.post  ('/api/login', passport.authenticate('local'), login);
  app.post('/api/register', register);
  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);

  app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/#/profile',
      failureRedirect: '/#/login'
    }));

  passport.use(new LocalStrategy(localStrategy));

  function register(req, res) {
    var user = req.body;
    userModel
      .createUser(user)
      .then(function(user){
        if(user) {
          req.login(user, function (err) {
            res.json(user);
          });
        }
      });
  }

  function login(req, res) {
    res.json(req.user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function loggedIn(req, res) {
   if(req.isAuthenticated()) {
     res.json(req.user);
   } else {
     res.send('0');
   }
  }

  passport.serializeUser(serializeUser);
  // Way out
  function serializeUser(user, done) {
    done(null, user);
  }

  passport.deserializeUser(deserializeUser);
  // Way In
  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByCredentials(username, password)
      .then(
        function(user) {
          if(user.username === username && user.password === password) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      );
  }


  function findUserById(req, res) {

    var userId = req.params['userId'];
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
    userModel
      .createUser(req.body)
      .then(function (user){
        res.json(user);
      }, function(err) {
      res.status(400).send(err);
    });
  }
  /* user._id = Math.random().toString();
   users.push(user);
   res.json(user);*/


  function updateUser(req, res) {
    var updatedUser = req.body;
    var userId = req.params['userId'];
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
    var userId = req.params['userId'];
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
