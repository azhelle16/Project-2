USE quiz_app;

INSERT INTO levels (level_name) VALUES	
("Easy"),
("Difficult");

INSERT INTO categories (category_name) VALUES	
("Animals");

INSERT INTO category_levels (category_id, level_id) VALUES	
(1,1),
(1,2);

INSERT INTO questions (question, category_levels_id) VALUES	
/*1*/("Which is the largest living bird?", 1),
/*2*/("Which large mammal's tail is so strong it can stand on it and lift its hind legs off the ground?", 1),
/*3*/("How many arms do most starfish have?", 1),
/*4*/("True or false - the python is a poisonous snake?", 1),
/*5*/("What kind of animal is a Komodo dragon?", 1),
/*6*/("What is the collective name for a group of lions?", 2),
/*7*/("Which of the following is a mammal that lays eggs?", 2),
/*8*/("Which bird has the largest wingspan of any living bird?", 2),
/*9*/("What kind of creature is a Portuguese man o' war?", 2),
/*10*/("What type of animal is a Flemish giant?", 2);

INSERT INTO answers (option_name, question_id, is_correct) VALUES	
("eagle", 1),
("swan", 1),
("ostrich", 1, "true"),
("wandering albatross", 1),

("kangaroo", 2, "true"),
("penguin", 2),
("leopard", 2),
("cat", 2),

("six", 3),
("eight", 3),
("four", 3),
("five", 3, "true"),

("true", 4),
("false", 4, "true"),

("snake", 5),
("lizard", 5, "true"),
("crocodile", 5),
("chameleon", 5),

("gang", 6),
("herd", 6),
("pride", 6, "true"),
("group", 6),

("penguin", 7),
("dolphin", 7),
("duck billed platypus", 7, "true"),
("bat", 7),

("eagle", 8),
("wandering albatross", 8, "true"),
("trumpeter swan", 8),
("white owl", 8),

("grasshopper", 9),
("spider", 9),
("jellyfish", 9, "true"),
("lizard", 9),

("rabbit", 10, "true"),
("bear", 10),
("panda", 10),
("hawk", 10);