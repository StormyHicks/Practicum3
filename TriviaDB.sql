DROP DATABASE IF EXISTS Trivia;
CREATE DATABASE Trivia;

USE Trivia;

CREATE TABLE `User`
(
 `User_Id`       int NOT NULL AUTO_INCREMENT ,
 `User_Name`     varchar(50) NOT NULL ,
 `User_Password` varchar(50) NOT NULL ,
 `User_Email`    varchar(50) NOT NULL ,
 `User_Admin`    bit NOT NULL ,

PRIMARY KEY (`User_Id`)
);

CREATE TABLE `Answer`
(
 `Answer_Id`   int NOT NULL AUTO_INCREMENT ,
 `Answer_Text` varchar(250) NOT NULL ,

PRIMARY KEY (`Answer_Id`)
);

CREATE TABLE `Category`
(
 `Category_Id`          int NOT NULL AUTO_INCREMENT ,
 `Category_Name`        varchar(50) NOT NULL ,
 `Category_Description` varchar(250) NOT NULL ,

PRIMARY KEY (`Category_Id`)
);

CREATE TABLE `Question`
(
 `Question_Id`   int NOT NULL AUTO_INCREMENT ,
 `Question_Text` varchar(250) NOT NULL ,
 `Category_Id`   int NOT NULL ,

PRIMARY KEY (`Question_Id`),
KEY `fkIdx_62` (`Category_Id`),
CONSTRAINT `FK_61` FOREIGN KEY `fkIdx_62` (`Category_Id`) REFERENCES `Category` (`Category_Id`)
);

CREATE TABLE `Question_Answer`
(
 `Question_Id` int NOT NULL ,
 `Answer_Id`   int NOT NULL ,
 `Is_Correct`  bit NOT NULL ,

PRIMARY KEY (`Question_Id`, `Answer_Id`),
KEY `fkIdx_42` (`Question_Id`),
CONSTRAINT `FK_41` FOREIGN KEY `fkIdx_42` (`Question_Id`) REFERENCES `Question` (`Question_Id`),
KEY `fkIdx_45` (`Answer_Id`),
CONSTRAINT `FK_44` FOREIGN KEY `fkIdx_45` (`Answer_Id`) REFERENCES `Answer` (`Answer_Id`)
);

CREATE TABLE `Score`
(
 `Score_Id`    int NOT NULL AUTO_INCREMENT ,
 `User_Id`     int NOT NULL ,
 `Category_Id` int NOT NULL ,
 `Score_Num`   int NOT NULL ,
 `Score_Total` int NOT NULL ,

PRIMARY KEY (`Score_Id`),
KEY `fkIdx_54` (`Category_Id`),
CONSTRAINT `FK_53` FOREIGN KEY `fkIdx_54` (`Category_Id`) REFERENCES `Category` (`Category_Id`),
KEY `fkIdx_58` (`User_Id`),
CONSTRAINT `FK_57` FOREIGN KEY `fkIdx_58` (`User_Id`) REFERENCES `User` (`User_Id`)
);

insert into User(User_Name, User_Password, User_Email, User_Admin)
values
('user1', 'password', 'user1@test.com', 1),
('user2', 'password', 'user2@test.com', 1),
('user3', 'password', 'user3@test.com', 0),
('user4', 'password', 'user4@test.com', 0),
('user5', 'password', 'user5@test.com', 0),
('user6', 'password', 'user6@test.com', 0),
('user7', 'password', 'user7@test.com', 0),
('user8', 'password', 'user8@test.com', 0),
('user9', 'password', 'user9@test.com', 0);

insert into Category(Category_Name, Category_Description)
values
('Category 1', 'Category 1 Description'),
('Category 2', 'Category 2 Description'),
('Category 3', 'Category 3 Description'),
('Category 4', 'Category 4 Description'),
('Category 5', 'Category 5 Description'),
('Category 6', 'Category 6 Description'),
('Category 7', 'Category 7 Description'),
('Category 8', 'Category 8 Description'),
('Category 9', 'Category 9 Description'),
('Category 10', 'Category 10 Description');

insert into Question(Category_Id, Question_Text)
values
(1, 'Category 1, Question 1'),
(1, 'Category 1, Question 2'),
(1, 'Category 1, Question 3'),
(1, 'Category 1, Question 4'),
(1, 'Category 1, Question 5'),
(1, 'Category 1, Question 6'),
(1, 'Category 1, Question 7'),
(1, 'Category 1, Question 8'),
(1, 'Category 1, Question 9'),
(1, 'Category 1, Question 10'),
(1, 'Category 1, Question 11'),
(1, 'Category 1, Question 12'),
(1, 'Category 1, Question 13'),
(1, 'Category 1, Question 14'),
(1, 'Category 1, Question 15'),
(1, 'Category 1, Question 16'),
(1, 'Category 1, Question 17'),
(1, 'Category 1, Question 18'),
(1, 'Category 1, Question 19'),
(1, 'Category 1, Question 20'),
(2, 'Category 2, Question 1'),
(2, 'Category 2, Question 2'),
(2, 'Category 2, Question 3'),
(2, 'Category 2, Question 4'),
(2, 'Category 2, Question 5'),
(2, 'Category 2, Question 6'),
(2, 'Category 2, Question 7'),
(2, 'Category 2, Question 8'),
(2, 'Category 2, Question 9'),
(2, 'Category 2, Question 10'),
(2, 'Category 2, Question 11'),
(2, 'Category 2, Question 12'),
(2, 'Category 2, Question 13'),
(2, 'Category 2, Question 14'),
(2, 'Category 2, Question 15'),
(2, 'Category 2, Question 16'),
(2, 'Category 2, Question 17'),
(2, 'Category 2, Question 18'),
(2, 'Category 2, Question 19'),
(2, 'Category 2, Question 20'),
(3, 'Category 3, Question 1'),
(3, 'Category 3, Question 2'),
(3, 'Category 3, Question 3'),
(3, 'Category 3, Question 4'),
(3, 'Category 3, Question 5'),
(3, 'Category 3, Question 6'),
(3, 'Category 3, Question 7'),
(3, 'Category 3, Question 8'),
(3, 'Category 3, Question 9'),
(3, 'Category 3, Question 10'),
(3, 'Category 3, Question 11'),
(3, 'Category 3, Question 12'),
(3, 'Category 3, Question 13'),
(3, 'Category 3, Question 14'),
(3, 'Category 3, Question 15'),
(3, 'Category 3, Question 16'),
(3, 'Category 3, Question 17'),
(3, 'Category 3, Question 18'),
(3, 'Category 3, Question 19'),
(3, 'Category 3, Question 20'),
(4, 'Category 4, Question 1'),
(4, 'Category 4, Question 2'),
(4, 'Category 4, Question 3'),
(4, 'Category 4, Question 4'),
(4, 'Category 4, Question 5'),
(4, 'Category 4, Question 6'),
(4, 'Category 4, Question 7'),
(4, 'Category 4, Question 8'),
(4, 'Category 4, Question 9'),
(4, 'Category 4, Question 10'),
(4, 'Category 4, Question 11'),
(4, 'Category 4, Question 12'),
(4, 'Category 4, Question 13'),
(4, 'Category 4, Question 14'),
(4, 'Category 4, Question 15'),
(4, 'Category 4, Question 16'),
(4, 'Category 4, Question 17'),
(4, 'Category 4, Question 18'),
(4, 'Category 4, Question 19'),
(4, 'Category 4, Question 20'),
(5, 'Category 5, Question 1'),
(5, 'Category 5, Question 2'),
(5, 'Category 5, Question 3'),
(5, 'Category 5, Question 4'),
(5, 'Category 5, Question 5'),
(5, 'Category 5, Question 6'),
(5, 'Category 5, Question 7'),
(5, 'Category 5, Question 8'),
(5, 'Category 5, Question 9'),
(5, 'Category 5, Question 10'),
(5, 'Category 5, Question 11'),
(5, 'Category 5, Question 12'),
(5, 'Category 5, Question 13'),
(5, 'Category 5, Question 14'),
(5, 'Category 5, Question 15'),
(5, 'Category 5, Question 16'),
(5, 'Category 5, Question 17'),
(5, 'Category 5, Question 18'),
(5, 'Category 5, Question 19'),
(5, 'Category 5, Question 20'),
(6, 'Category 6, Question 1'),
(6, 'Category 6, Question 2'),
(6, 'Category 6, Question 3'),
(6, 'Category 6, Question 4'),
(6, 'Category 6, Question 5'),
(6, 'Category 6, Question 6'),
(6, 'Category 6, Question 7'),
(6, 'Category 6, Question 8'),
(6, 'Category 6, Question 9'),
(6, 'Category 6, Question 10'),
(6, 'Category 6, Question 11'),
(6, 'Category 6, Question 12'),
(6, 'Category 6, Question 13'),
(6, 'Category 6, Question 14'),
(6, 'Category 6, Question 15'),
(6, 'Category 6, Question 16'),
(6, 'Category 6, Question 17'),
(6, 'Category 6, Question 18'),
(6, 'Category 6, Question 19'),
(6, 'Category 6, Question 20'),
(7, 'Category 7, Question 1'),
(7, 'Category 7, Question 2'),
(7, 'Category 7, Question 3'),
(7, 'Category 7, Question 4'),
(7, 'Category 7, Question 5'),
(7, 'Category 7, Question 6'),
(7, 'Category 7, Question 7'),
(7, 'Category 7, Question 8'),
(7, 'Category 7, Question 9'),
(7, 'Category 7, Question 10'),
(7, 'Category 7, Question 11'),
(7, 'Category 7, Question 12'),
(7, 'Category 7, Question 13'),
(7, 'Category 7, Question 14'),
(7, 'Category 7, Question 15'),
(7, 'Category 7, Question 16'),
(7, 'Category 7, Question 17'),
(7, 'Category 7, Question 18'),
(7, 'Category 7, Question 19'),
(7, 'Category 7, Question 20'),
(8, 'Category 8, Question 1'),
(8, 'Category 8, Question 2'),
(8, 'Category 8, Question 3'),
(8, 'Category 8, Question 4'),
(8, 'Category 8, Question 5'),
(8, 'Category 8, Question 6'),
(8, 'Category 8, Question 7'),
(8, 'Category 8, Question 8'),
(8, 'Category 8, Question 9'),
(8, 'Category 8, Question 10'),
(8, 'Category 8, Question 11'),
(8, 'Category 8, Question 12'),
(8, 'Category 8, Question 13'),
(8, 'Category 8, Question 14'),
(8, 'Category 8, Question 15'),
(8, 'Category 8, Question 16'),
(8, 'Category 8, Question 17'),
(8, 'Category 8, Question 18'),
(8, 'Category 8, Question 19'),
(8, 'Category 8, Question 20'),
(9, 'Category 9, Question 1'),
(9, 'Category 9, Question 2'),
(9, 'Category 9, Question 3'),
(9, 'Category 9, Question 4'),
(9, 'Category 9, Question 5'),
(9, 'Category 9, Question 6'),
(9, 'Category 9, Question 7'),
(9, 'Category 9, Question 8'),
(9, 'Category 9, Question 9'),
(9, 'Category 9, Question 10'),
(9, 'Category 9, Question 11'),
(9, 'Category 9, Question 12'),
(9, 'Category 9, Question 13'),
(9, 'Category 9, Question 14'),
(9, 'Category 9, Question 15'),
(9, 'Category 9, Question 16'),
(9, 'Category 9, Question 17'),
(9, 'Category 9, Question 18'),
(9, 'Category 9, Question 19'),
(9, 'Category 9, Question 20'),
(10, 'Category 10, Question 1'),
(10, 'Category 10, Question 2'),
(10, 'Category 10, Question 3'),
(10, 'Category 10, Question 4'),
(10, 'Category 10, Question 5'),
(10, 'Category 10, Question 6'),
(10, 'Category 10, Question 7'),
(10, 'Category 10, Question 8'),
(10, 'Category 10, Question 9'),
(10, 'Category 10, Question 10'),
(10, 'Category 10, Question 11'),
(10, 'Category 10, Question 12'),
(10, 'Category 10, Question 13'),
(10, 'Category 10, Question 14'),
(10, 'Category 10, Question 15'),
(10, 'Category 10, Question 16'),
(10, 'Category 10, Question 17'),
(10, 'Category 10, Question 18'),
(10, 'Category 10, Question 19'),
(10, 'Category 10, Question 20');

drop table if exists answers;
create temporary table answers (i int);
insert into answers values (1),(2),(3),(4);

insert into Answer(Answer_Text)
select concat('Question ', convert(q.Question_Id, char), ' Answer ', convert(a.i, char))
from Question q
inner join answers a on 1=1;

insert into Question_Answer
select SUBSTRING_INDEX(SUBSTRING_INDEX(a.Answer_Text, ' ', 2), ' ', -1) 'Question_Id', a.Answer_Id, if(right(a.Answer_Text, 1) = 4, 1, 0) 'Is_Correct'
from Answer a;
