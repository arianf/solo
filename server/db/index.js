var Sequelize = require('sequelize');
var dbconfig = require('./pw');

var orm = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

var User = orm.define('User', {
  username: Sequelize.STRING
});

var Message = orm.define('Message', {
  roomname: Sequelize.STRING,
  text: Sequelize.STRING
});

User.hasMany(Message);
Message.belongsTo(User);

User.sync();
Message.sync();

exports.User = User;
exports.Message = Message;