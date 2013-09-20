//A module used to store all the levels in one array called Levels
//Written by: Luke Brown

// An array containing all the Levels
//-----------------------------------

var Levels = new Array();


//Developer level:
Levels[0] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

//Level 1: Answer: 'K'
Levels[1] = new Level([new Line(new Posn(1, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(1, 9), "App")],
    [new Line(new Posn(9, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(9, 9), "App"), new Line(new Posn(5, 1), new Posn(5, 9), "App")],
        new Restriction(1, 0), "Peter come up with a hint", "The 11th letter in the alphabet");

//Level 2: Answer: 'A'
Levels[2] = new Level([new Line(new Posn(1, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(1, 9), "App")],
    [new Line(new Posn(1, 9), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(9, 9), "App"), new Line(new Posn(3, 7), new Posn(7, 7), "App")],
        new Restriction(1, 0), "", "Your favourite grade!");

//Level 3: Answer: 'Y'
Levels[3] = new Level([new Line(new Posn(1, 2), new Posn(4, 5), "App"), new Line(new Posn(4, 5), new Posn(1, 8), "App")],
    [new Line(new Posn(2, 1), new Posn(5, 4), "App"), new Line(new Posn(5, 4), new Posn(8, 1), "App"), new Line(new Posn(5, 4), new Posn(5, 9), "App")],
        new Restriction(1, 0), "", "");

//Level 4: Answer: 'F'
Levels[4] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(5, 5), new Posn(8, 5), "App")], 
		new Restriction(1, 1), "", "");

//Level 5: Answer: 'L'
Levels[5] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 8), new Posn(8, 8))], 
		new Restriction(0, 1), "", "");

//Level 6: Answer '8'
Levels[6] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App"), new Line(new Posn(2, 8), new Posn(8, 2), "App")], 
		new Restriction(1, 0), "Figure _", "");

//level 7: Answer 'M'
Levels[7] = new Level([new Line(new Posn(8, 3), new Posn(2, 3), "App"),new Line(new Posn(5, 4), new Posn(8, 8), "App"),new Line(new Posn(2, 8), new Posn(5, 4), "App"),new Line(new Posn(2, 3), new Posn(2, 8), "App"),new Line(new Posn(8, 3), new Posn(8, 8), "App")], 
	[new Line(new Posn(5, 6), new Posn(2, 2), "App"),new Line(new Posn(8, 2), new Posn(5, 6), "App"),new Line(new Posn(8, 7), new Posn(8, 2), "App"),new Line(new Posn(2, 7), new Posn(2, 2), "App")], 
		new Restriction(0, 1), "", "");

//level 8: Answer "Envelope"
Levels[8] = new Level([new Line(new Posn(8, 3), new Posn(2, 3), "App"),new Line(new Posn(5, 4), new Posn(8, 8), "App"),new Line(new Posn(2, 8), new Posn(5, 4), "App"),new Line(new Posn(2, 3), new Posn(2, 8), "App"),new Line(new Posn(8, 3), new Posn(8, 8), "App")],
	[new Line(new Posn(2, 2), new Posn(8, 2), "App"),new Line(new Posn(2, 7), new Posn(8, 7), "App"),new Line(new Posn(5, 6), new Posn(2, 2), "App"),new Line(new Posn(8, 2), new Posn(5, 6), "App"),new Line(new Posn(8, 7), new Posn(8, 2), "App"),new Line(new Posn(2, 7), new Posn(2, 2), "App")], 
		new Restriction(1, 0), "You got mail!", "");

//level 9: Answer "Pyramid"
Levels[9] = new Level([new Line(new Posn(8, 3), new Posn(2, 3), "App"),new Line(new Posn(5, 4), new Posn(8, 8), "App"),new Line(new Posn(2, 8), new Posn(5, 4), "App"),new Line(new Posn(2, 3), new Posn(2, 8), "App"),new Line(new Posn(8, 3), new Posn(8, 8), "App")], 
	[new Line(new Posn(5, 4), new Posn(6, 3), "App"),new Line(new Posn(5, 4), new Posn(4, 3), "App"),new Line(new Posn(2, 8), new Posn(8, 8), "App"),new Line(new Posn(8, 3), new Posn(2, 3), "App"),new Line(new Posn(2, 8), new Posn(5, 4), "App"),new Line(new Posn(5, 4), new Posn(8, 8), "App"),new Line(new Posn(2, 3), new Posn(2, 8), "App"),new Line(new Posn(8, 3), new Posn(8, 8), "App")], 
		new Restriction(3, 0), "Developer Level", "The answer is nothing");

//level 10: Answer
Levels[10] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App"), new Line(new Posn(2, 8), new Posn(8, 2), "App")], 
		new Restriction(1, 0), "Figure _", "");

//level 11: Answer
Levels[11] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

//level 12: Answer
Levels[12] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

//level 13: Answer
Levels[13] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

//level 14: Answer
Levels[15] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

//level 16: Answer
Levels[16] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

//level 17: Answer
Levels[17] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

//level 18: Answer
Levels[18] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");
