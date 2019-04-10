DROP DATABASE IF EXISTS quiz_app;

CREATE DATABASE quiz_app;

USE quiz_app;

CREATE TABLE teams (
	id INT NOT NULL AUTO_INCREMENT,
	team_name VARCHAR(255) NOT NULL,
	score INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	role INT NOT NULL,
	team_id INT NOT NULL,
	FOREIGN KEY (team_id) REFERENCES teams(id),
	PRIMARY KEY (id)
);

CREATE TABLE levels (
	id INT NOT NULL AUTO_INCREMENT,
	level_name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE categories (
	id INT NOT NULL AUTO_INCREMENT,
	category_name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE scores (
	user_id INT NOT NULL,
	score INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE category_levels (
	id INT NOT NULL AUTO_INCREMENT,
	category_id INT NOT NULL,
	level_id INT NOT NULL,
	FOREIGN KEY (level_id) REFERENCES levels(id),
	FOREIGN KEY (category_id) REFERENCES categories(id),
	PRIMARY KEY (id)
);

CREATE TABLE questions (
	id INT NOT NULL AUTO_INCREMENT,
	question VARCHAR(255) NOT NULL,
	category_levels_id INT NOT NULL,
	FOREIGN KEY (category_levels_id) REFERENCES category_levels(id),
	PRIMARY KEY (id)
);

CREATE TABLE answers (
	id INT NOT NULL AUTO_INCREMENT,
	option_name VARCHAR(255) NOT NULL,
	question_id INT NOT NULL,
	is_correct VARCHAR(255) DEFAULT 'false',
	FOREIGN KEY (question_id) REFERENCES questions(id),
	PRIMARY KEY (id)
);








