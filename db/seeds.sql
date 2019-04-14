USE quiz_app;

INSERT INTO teams (team_name, score) VALUES	
("Gryffindor", 0),
("Slytherin", 0),
("Ravenclaw", 0),
("Hufflepuff", 0);

INSERT INTO levels (level_name) VALUES	
("Easy"),
("Difficult");

INSERT INTO categories (category_name) VALUES	
("Animals"),
("Science");

INSERT INTO category_levels (category_id, level_id) VALUES	
/*1*/(1,1),
/*2*/(1,2),
/*3*/(2,1),
/*4*/(2,2);

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
/*10*/("What type of animal is a Flemish giant?", 2),
/*11*/("How many hearts do octopuses have?", 3),
/*12*/("Who discovered penicillin?", 3),
/*13*/("Who developed the special theory of relativity?", 3),
/*14*/("How many hydrogen atoms are in one molecule of water?", 3),
/*15*/("What is the chemical symbol for potassium?", 3),
/*16*/("What is the heaviest organ in the human body?", 4),
/*17*/("How many compartments does a cow's stomach have?", 4),
/*18*/("What number on the Beaufort wind scale corresponds to hurricane force?", 4),
/*19*/("What is the product of a body's mass and its linear velocity?", 4),
/*20*/("Brass is an alloy of which two metals?", 4);

INSERT INTO answers (option_name, question_id) VALUES	
/*1*/("eagle", 1),
("swan", 1),
("ostrich", 1),
("wandering albatross", 1),

/*2*/("kangaroo", 2),
("penguin", 2),
("leopard", 2),
("cat", 2),

/*3*/("six", 3),
("eight", 3),
("four", 3),
("five", 3),

/*4*/("true", 4),
("false", 4),

/*5*/("snake", 5),
("lizard", 5),
("crocodile", 5),
("chameleon", 5),

/*6*/("gang", 6),
("herd", 6),
("pride", 6),
("group", 6),

/*7*/("penguin", 7),
("dolphin", 7),
("duck billed platypus", 7),
("bat", 7),

/*8*/("eagle", 8),
("wandering albatross", 8),
("trumpeter swan", 8),
("white owl", 8),

/*9*/("grasshopper", 9),
("spider", 9),
("jellyfish", 9),
("lizard", 9),

/*10*/("rabbit", 10),
("bear", 10),
("panda", 10),
("hawk", 10),

/*11*/("three", 11),
("one", 11),
("two", 11),
("four", 11),

/*12*/("Alexander Graham Bell", 12),
("Alexander Fleming", 12),
("Marie Curie", 12),
("Charles Darwin", 12),

/*13*/("Isaac Newton", 13),
("Charles Darwin", 13),
("Alexander Graham Bell", 13),
("Albert Einstein", 13),

/*14*/("three", 14),
("one", 14),
("two", 14),
("four", 14),

/*15*/("P", 15),
("K", 15),
("Po", 15),
("Ka", 15),

/*16*/("heart", 16),
("brain", 16),
("lungs", 16),
("liver", 16),

/*17*/("four", 17),
("three", 17),
("five", 17),
("two", 17),

/*18*/("9", 18),
("0", 18),
("12", 18),
("8", 18),

/*19*/("momentum", 19),
("distance", 19),
("force", 19),
("speed", 19),

/*20*/("nickel and iron", 20),
("copper and zinc", 20),
("copper and nickel", 20),
("copper and tin", 20);

INSERT INTO solutions (question_id, correct_ans_id) VALUES
(1,3),
(2,5),
(3,12),
(4,14),
(5,16),
(6,21),
(7,25),
(8,28),
(9,33),
(10,35),
(11,39),
(12,44),
(13,50),
(14,53),
(15,56),
(16,62),
(17,63),
(18,69),
(19,71),
(20,76);