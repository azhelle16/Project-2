USE quiz_app;

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

INSERT INTO answers (option_name, question_id, is_correct) VALUES	
("eagle", 1, "false"),
("swan", 1, "false"),
("ostrich", 1, "true"),
("wandering albatross", 1, "false"),

("kangaroo", 2, "true"),
("penguin", 2, "false"),
("leopard", 2, "false"),
("cat", 2, "false"),

("six", 3, "false"),
("eight", 3, "false"),
("four", 3, "false"),
("five", 3, "true"),

("true", 4, "false"),
("false", 4, "true"),

("snake", 5, "false"),
("lizard", 5, "true"),
("crocodile", 5, "false"),
("chameleon", 5, "false"),

("gang", 6, "false"),
("herd", 6, "false"),
("pride", 6, "true"),
("group", 6, "false"),

("penguin", 7, "false"),
("dolphin", 7, "false"),
("duck billed platypus", 7, "true"),
("bat", 7, "false"),

("eagle", 8, "false"),
("wandering albatross", 8, "true"),
("trumpeter swan", 8, "false"),
("white owl", 8, "false"),

("grasshopper", 9, "false"),
("spider", 9, "false"),
("jellyfish", 9, "true"),
("lizard", 9, "false"),

("rabbit", 10, "true"),
("bear", 10, "false"),
("panda", 10, "false"),
("hawk", 10, "false"),

("three", 11, "true"),
("one", 11, "false"),
("two", 11, "false"),
("four", 11, "false"),

("Alexander Graham Bell", 12, "false"),
("Alexander Fleming", 12, "true"),
("Marie Curie", 12, "false"),
("Charles Darwin", 12, "false"),

("Isaac Newton", 13, "false"),
("Charles Darwin", 13, "false"),
("Alexander Graham Bell", 13, "false"),
("Albert Einstein", 13, "true"),

("three", 14, "false"),
("one", 14, "false"),
("two", 14, "true"),
("four", 14, "false"),

("P", 15, "false"),
("K", 15, "true"),
("Po", 15, "false"),
("Ka", 15, "false"),

("heart", 16, "false"),
("brain", 16, "false"),
("lungs", 16, "false"),
("liver", 16, "true"),

("four", 17, "true"),
("three", 17, "false"),
("five", 17, "false"),
("two", 17, "false"),

("9", 18, "false"),
("0", 18, "false"),
("12", 18, "true"),
("8", 18, "false"),

("momentum", 19, "true"),
("distance", 19, "false"),
("force", 19, "false"),
("speed", 19, "false"),

("nickel and iron", 20, "false"),
("copper and zinc", 20, "true"),
("copper and nickel", 20, "false"),
("copper and tin", 20, "false");
