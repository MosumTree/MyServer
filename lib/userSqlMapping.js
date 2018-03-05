var user = {
	create:`CREATE TABLE if not exists user(
		user_id INT NOT NULL AUTO_INCREMENT,
		user_name VARCHAR(20) NOT NULL,
		user_password VARCHAR(1000) NOT NULL,
		user_sex VARCHAR(1) NOT NULL,
		user_avator VARCHAR(100) NOT NULL,
		user_bio VARCHAR(100) NOT NULL,
		PRIMARY KEY(user_id))`,
	insert:'INSERT INTO user(user_id, user_name, user_password, user_sex, user_avator, user_bio) VALUES(?,?,?,?,?,?)',
	update:'update user set name=?, age=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
};

module.exports = user;

