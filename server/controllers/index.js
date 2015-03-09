// var db = require('../db');
var bluebird = require('bluebird');


module.exports = {
  messages: {
    get: function (req, res) {
      // db.Message.findAll({include: [db.User]})
      //   .complete(function(err, results){
      //     // optional mapping step
      //     res.json(results);
      //   });
    },
    post: function (req, res) {
      // db.User.findOrCreate({where: {username: req.body.username}})
      //   .complete(function(err, results){
      //     db.Message.create({
      //       userid: results[0].dataValues.id,
      //       text: req.body.message,
      //       roomname: req.body.roomname
      //     }).complete(function(err, results){
      //       res.sendStatus(201);
      //     });
      //   });
    }
  },

  users: {
    get: function (req, res) {
      // db.User.findAll()
      //   .complete(function(err, results){
      //     res.json(results);
      //   });
    },
    post: function (req, res) {
      // db.User.create({
      //   username: req.body.username
      // }).complete(function(err, results){
      //   res.sendStatus(201);
      // });
    }
  }
};

