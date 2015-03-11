var db = require('../db');
var bluebird = require('bluebird');
var Sequelize = require('sequelize');

module.exports = {
  ask: {
    get: function (req, res) {
      if(req.query.id !== undefined && req.query.id >= 0 && req.query.id !== ''){
        db.Post.find(req.query.id).complete(function(err, results){
          res.json(results);
        });
      }else{
        db.Post.findAll().complete(function(err, results){
          res.json(results);
        });
      }
    },
    post: function (req, res) {
      if(req.body.title !== undefined){
        db.Post.create({
          title: req.body.title,
          desc: req.body.desc
        }).complete(function(err, results){
          res.sendStatus(201);
        });
      }else{
        res.sendStatus(404, 'title not provided');
      }
    }
  },
  comment: {
    get: function(req, res) {
      if(req.query.id !== undefined && req.query.id >= 0 && req.query.id !== ''){
        db.Comment.findAll({where: {postId: req.query.id}})
          .complete(function(err, results){
            res.json(results);
          });
      }
    },
    post: function(req, res) {
      if(req.body.id !== undefined && req.body.id >= 0 && req.body.id !== '' && req.body.text !== undefined){
        if(req.body.username === ''){
          req.body.username = undefined;
        }
        db.Comment.create({postId: req.body.id, text: req.body.text, username: req.body.username}).complete(function(err, results){
          res.json(results);
        });
      }else{
        res.end('failed');
      }
    }
  },
  vote: {
    get: function(req, res) {

    },
    post: function(req, res) {
      if(req.body.id !== undefined && req.body.id >= 0 && req.body.id !== ''){
        var voting = 'vote';
        if(req.body.up !== undefined){
          voting = voting + '+1';
        }else{
          voting = voting + '-1';
        }
        db.Comment.update({vote: Sequelize.literal(voting)},{where: { id : req.body.id }})
          .success(function () { 
            res.sendStatus(202);
          })
          .error(function () {
            console.log('error happened');
            res.sendStatus(500);
         });
      }
    }
  },
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

