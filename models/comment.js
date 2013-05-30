var mongodb = require('./db');

function Comment(name, day, title, comment) {
  this.name = name;
  this.day = day;
  this.title = title;
  this.comment = comment;
}

module.exports = Comment;

Comment.prototype.save = function(callback) {
  var name = this.name,
      day = this.day,
      title = this.title,
      comment = this.comment;
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //通过用户名、发表日期及标题查找文档，并把一条留言添加到该文档的 comments 数组里
      console.log(name);
      collection.findAndModify({"name":name}
      , []
      , {$push:{"comments":comment}}
      , {new: true}
      , function (err,comment) {
        console.log(err);
          mongodb.close();
          callback(null);
      });   
    });
  });
};