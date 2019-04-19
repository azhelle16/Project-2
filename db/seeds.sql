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
-- ("90's Music")
-- ("History"),
-- ("Movie");

INSERT INTO category_levels (category_id, level_id) VALUES	
/*1*/(1,1),
/*2*/(1,2),
/*3*/(2,1),
/*4*/(2,2);
-- /*5*/(3,1);
-- /*6*/(3,2),
-- /*7*/(4,1),
-- /*8*/(4,2),
-- /*9*/(5,1),
-- /*10*/(5,2);

INSERT INTO questions (question, category_levels_id) VALUES	
/*1*/("Which is the largest living bird?", 1),
/*2*/("Which large mammal's tail is so strong it can stand on it and lift its hind legs off the ground?", 1),
/*3*/("How many arms do most starfish have?", 1),
/*4*/("True or False - The python is a poisonous snake?", 1),
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
/*20*/("Brass is an alloy of which two metals?", 4),
/*21*/("What is the slowest animal in the world?",1),
/*22*/("Which bird is the symbol of peace?",1),
/*23*/("What do you call a baby kangaroo?",1),
/*24*/("A female deer is called?",1),
/*25*/("How many legs does a spider have?",1),
/*26*/("How many bones are there in the human body?",2),
/*27*/("What is a tomato, either a fruit or vegetable?",2),
/*28*/("Which planet is closest to the Sun?",2),
/*29*/("What are the bones around the chest known as for protection of the lungs and heart?",2),
/*30*/("Which part of the human body is serving purpose of maintaning balance?",2),
/*31*/("True or False - The horn of the rhinoceros is made up of hairs?",3),
/*32*/("What was the name of the cheetah that has recorded the fastest speed?",3),
/*33*/("What is the favorite food of rabbits?",3),
/*34*/("The blind dolphins are found in which river?",3),
/*35*/("Out of twelve, how many dogs survive in Titanic?",3),
/*36*/("Which scientists are studying motion?",4),
/*37*/("When was penicillin made public?",4),
/*38*/("What is the largest part of the human brain?",4),
/*39*/("Which of the three gasses are part of the Noble gasses?",4),
/*40*/("Is the stratosphere, above or below the troposphere?",4);
-- /*41*/("Which female artist released a song called 'Hero' in 1993?",5),
-- /*42*/("Who sang the pop version of 'A Whole New World'?",5),
-- /*43*/("Which 90's boy group has members that were part of The Mickey Mouse Club?",5),
-- /*44*/("Who was the lead vocalist of Nirvana?",5),
-- /*45*/("Which Spice Girls was nicknamed 'Sporty Spice'?",5),
-- /*46*/("Lisa (Left Eye) Lopez belonged to which rap band?",5),
-- /*47*/("When did Tupac died?",5),
-- /*48*/("Who sang 'I Do (Cherish You)'?",5),
-- /*49*/("Which song of the band Roxette was featured in The Pretty Woman?",5),
-- /*50*/("True or False - Un-break My Heart is Titanic's Theme Song?",5);

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
("copper and tin", 20),

/*21*/("snail",21),
("manatee",21),
("giant tortoise",21),
("three-toed sloth",21),

/*22*/("hummingbird",22),
("dove",22),
("pigeon",22),
("mockingbird",22),

/*23*/("buck",23),
("fawn",23),
("joey",23),
("drake",23),

/*24*/("doe",24),
("ewe",24),
("fawn",24),
("stag",24),

/*25*/("eight",25),
("ten",25),
("six",25),
("twelve",25),

/*26*/("206",26),
("208",26),
("205",26),
("210",26),

/*27*/("vegetable",27),
("fruit",27),

/*28*/("Jupiter",28),
("Venus",28),
("Earth",28),
("Mercury",28),

/*29*/("pelvis",29),
("sternum",29),
("ribs",29),
("skull",29),

/*30*/("feet",30),
("legs",30),
("ears",30),
("hips",30),

/*31*/("true",31),
("false",31),

/*32*/("Nancy",32),
("Fleur",32),
("Sarah",32),
("Jenny",32),

/*33*/("carrots",33),
("cabbage",33),
("lettuce",33),
("zucchini",33),

/*34*/("Indus River",34),
("Pacific Ocean",34),
("Amazon River",34),
("Atlantic Ocean",34),

/*35*/("one",35),
("two",35),
("three",35),
("zero",35),

/*36*/("Physicists",36),
("Biologists",36),
("Anthropologists",36),
("Entomologists",36),

/*37*/("1936",37),
("1941",37),
("1944",37),
("1948",37),

/*38*/("cerebellum",38),
("cerebrum",38),
("brainstem",38),
("antebellum",38),

/*39*/("Radon Nitogen and Krypton",39),
("Neon Radon and Hydrogen",39),
("Chlorine Krypton and Oxygen",39),
("Helium Argon and Xenon",39),

/*40*/("extending 50km above the troposhere", 40),
('extending 50km below the troposhere',40);

-- /*41*/("Whitney Houston",41),
-- ("Mariah Carey",41),
-- ("Celine Dion",41),
-- ("Sheena Easton",41),

-- /*42*/("Brad Kane and Lea Salonga",42),
-- ("Peabo Bryson and Celine Dion",42),
-- ("James Ingram and Regina Belle",42),
-- ("Peabo Bryson and Regina Belle",42),

-- /*43*/("Backstreet Boys",43),
-- ("Boyzone",43),
-- ("A1",43),
-- ("N' Sync",43),

-- /*44*/("Dave Grohl",44),
-- ("Dave Foster",44),
-- ("Krist Novoselic",44),
-- ("Kurt Cobain",44),

-- /*45*/("Melanie Brown",45),
-- ("Geri Halliwell",45),
-- ("Mel C",45),
-- ("Emma Bunton",45),

-- /*46*/("TLC",46),
-- ("Destiny's Child",46),
-- ("Limp Bizkit",46),
-- ("Steps",46),

-- /*47*/("09/13/1992",47),
-- ("09/13/1994",47),
-- ("09/13/1996",47),
-- ("09/13/1993",47),

-- /*48*/("A1",48),
-- ("98 Degrees",48),
-- ("Westlife",48),
-- ("N' Sync",48),

-- /*49*/("Almost Unreal",49),
-- ("Run To You",49),
-- ("It Must Have Been Love",49),
-- ("Stars",49),

-- /*50*/("true",50),
-- ("false",50);

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
(20,76),
(21,82),
(22,84),
(23,89),
(24,91),
(25,95),
(26,99),
(27,104),
(28,108),
(29,111),
(30,115),
(31,117),
(32,121),
(33,125),
(34,127),
(35,133),
(36,135),
(37,141),
(38,144),
(39,150),
(40,151);
-- (41,154),
-- (42,160),
-- (43,164),
-- (44,168),
-- (45,171),
-- (46,173),
-- (47,179),
-- (48,182),
-- (49,187),
-- (50,190);

-- heroku addons:create jawsdb:kitefin -a ucb-quiz-app --version=8.0