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
	level_id INT NOT NULL,
	FOREIGN KEY (level_id) REFERENCES levels(id),
	PRIMARY KEY (id)
);

CREATE TABLE scores (
	user_id INT NOT NULL,
	score INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE questions (
	id INT NOT NULL AUTO_INCREMENT,
	question VARCHAR(255) NOT NULL,
	option_one VARCHAR(255) NOT NULL,
	option_two VARCHAR(255) NOT NULL,
	option_three VARCHAR(255) NOT NULL,
	option_four VARCHAR(255) NOT NULL,
	correct_answer VARCHAR(255) NOT NULL,
	category_id INT NOT NULL,
	level_id INT NOT NULL,
	FOREIGN KEY (level_id) REFERENCES levels(id),
	FOREIGN KEY (category_id) REFERENCES categories(id),
	PRIMARY KEY (id)
);