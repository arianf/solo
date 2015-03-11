var Sequelize = require('sequelize');
var dbconfig = require('./pw');

var orm = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

var Post = orm.define('post', {
  username: {type: Sequelize.STRING, defaultValue: 'anonymous'},
  title: Sequelize.STRING,
  desc: Sequelize.STRING
});

var Comment = orm.define('comment', {
  username: {type: Sequelize.STRING, defaultValue: 'anonymous'},
  text: Sequelize.STRING,
  vote: {type: Sequelize.INTEGER, defaultValue: 0}
});
// var User = orm.define('User', {
//   username: Sequelize.STRING
// });

// var Message = orm.define('Message', {
//   roomname: Sequelize.STRING,
//   text: Sequelize.STRING
// });

// User.hasMany(Message);
// Message.belongsTo(User);

Comment.belongsTo(Post);

Post.sync();
Comment.sync();
// User.sync();
// Message.sync();

exports.Comment = Comment;
exports.Post = Post;
// exports.User = User;
// exports.Message = Message;