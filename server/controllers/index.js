var db = require('../db');
var bluebird = require('bluebird');
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
// console.log(AWS.config);
// export AWS_ACCESS_KEY_ID='AKIAJ6NVAAPSCEMGU3BA'
// export AWS_SECRET_ACCESS_KEY='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'

// var s3 = new AWS.S3();
// s3.listBuckets(function(err, data) {
//   if (err) { console.log("Error:", err); }
//   else {
//     for (var index in data.Buckets) {
//       var bucket = data.Buckets[index];
//       console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
//     }
//   }
// });

// var s3bucket = new AWS.S3({params: {Bucket: 'pleaserespond'}});
// s3bucket.createBucket(function() {
//   var params = {Key: 'myKey', Body: 'Hello!'};
//   s3bucket.upload(params, function(err, data) {
//     if (err) {
//       console.log("Error uploading data: ", err);
//     } else {
//       console.log("Successfully uploaded data to myBucket/myKey");
//     }
//   });
// });


module.exports = {
  ask: {
    get: function (req, res) {
      if(req.query.id !== undefined && req.query.id > 0 && req.query.id !== ''){
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

