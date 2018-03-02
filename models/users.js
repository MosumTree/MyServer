const User = require('../lib/userDAO')
module.exports = {
  // 创建用户信息表
  create: function create () {
    return User.create()
  },
  add:function add(user) {
    return User.add(user)
  }
  // 通过用户名获取用户信息
  // getUserByName: function getUserByName (name) {
  //   return User
  //     .findOne({ name: name })
  //     .addCreatedAt()
  //     .exec()
  // }
}