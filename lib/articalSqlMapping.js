var articalSQL = {
    create:`create table if not exists articals(
        articalId INT NOT NULL AUTO_INCREMENT,
        articalTitle VARCHAR(255) NOT NULL ,
        articalSummary VARCHAR(1000) NOT NULL,
        articalContent TEXT NOT NULL,
        articalAuthor VARCHAR(45) NOT NULL,
        articalPublishTime VARCHAR(45) NOT NULL,
        articalVisitedTimes INT(11) NOT NULL,
        PRIMARY KEY(articalId));`,
	insert:'INSERT INTO user(user_id, user_name, user_password, user_sex, user_avator, user_bio) VALUES(?,?,?,?,?,?)',
	update:'update user set name=?, age=? where id=?',
	delete: 'delete from user where id=?',
	queryArticalById: 'select * from articals where articalId=?',
	queryAllArticals: 'select * from articals'
};
 
module.exports = articalSQL;