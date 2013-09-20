//A module used to store commonly used functions
//Written by: Luke Brown


//Constants
//---------

var SCALING = 10,       //Define Grid size (10 x 10)
    XOFFSET = 25,       //Width of document to canvas (from the left)
    YOFFSET = 68,       //Width of document to canvas (from top)
    DEVMODE = false,    //Force grid and level 0 (Dev level)
    GRID = new Array(); //Array of lines making the grid

for(var i = 1; i < 2*SCALING - 1;i += 1) {
    if (i < SCALING){ GRID[i-1] = new Line(new Posn(i, 0), new Posn(i, SCALING), "App"); }
    else { GRID[i-1] = new Line(new Posn(0, i - SCALING + 1), new Posn(SCALING, i - SCALING + 1), "App"); }
}


//Variable Declaration
//-------------------

var currLevelNum = 1,                                         //Defaults level 1
    currLevel = Levels[1],                                    //Defaults level 1
    currSoln = new UserSolution(currLevel.graph, 0, 0, []),   //Defaults level 1

    inDrawMode  = true,                                       //Defaults Draw  Mode enabled
    inEraseMode = !inDrawMode,                                //Defaults Erase Mode disabled
    includeGrid = false;                                      //Defaults false can be set to true by user


//Helper Funcions
//----------------

//map: (X->Y) [X] -> [Y]
function map(f, lst) {
    "use strict";
    var newlst = new Array();
    for (var i = 0;i < lst.length; i++){
        newlst[i] = f(lst[i]);
    }
    return newlst;
}

//scalePointscalePoint: Number -> Number -> Number -> Number -> Posn
function scalePoint(point_x, point_y, scaling, canvaslength){
    "use strict";
    return new Posn(Math.round((point_x - XOFFSET) * (scaling / canvaslength)), Math.round(( point_y - YOFFSET) * (scaling / canvaslength)));
}

//counterClock: Posn -> Posn -> Posn -> Bool
function counterClock(point1, point2, point3) {
    "use strict";
    return (point3.y - point1.y) * (point2.x - point1.x) > (point2.y - point1.y) * (point3.x - point1.x);
}

//interset: Line -> Line -> Bool
function interset(line1, line2) {
    "use strict";
    return ((counterClock(line1.p1, line2.p1, line2.p2) != counterClock(line1.p2, line2.p1, line2.p2)) && 
            (counterClock(line1.p1, line1.p2, line2.p1) != counterClock(line1.p1, line1.p2, line2.p2)));
}

//lineLength: Line -> Number
function lineLength(line) {
    "use strict";
    return Math.sqrt(Math.pow(line.p2.x - line.p1.x, 2) + Math.pow(line.p2.y - line.p1.y, 2));
}

//midPoint: Line -> Posn
function midPoint(line) {
    "use strict";
    return new Posn((line.p1.x + line.p2.x) / 2, (line.p1.y + line.p2.y) / 2);
}

//lineToPointDistance: Line -> Posn -> Number
function lineToPointDistance(line, point) {
    "use strict";
    var midpoint = midPoint(line);
    return Math.sqrt(Math.pow(point.x - midpoint.x, 2) + Math.pow(point.y - midpoint.y, 2));
}

//swap: Line -> Line
function swap(line) {
    "use strict";
    return new Line(new Posn(line.p2.x, line.p2.y), new Posn(line.p1.x, line.p1.y), line.owner);
}

//arrangePoints: Line -> Line
function arrangePoints(line) {
    "use strict";
    if (line.p1.x < line.p2.x) { return line; }
    else if (line.p1.x > line.p2.x) { return swap(line); }
    else if (line.p1.y < line.p2.y) { return line; }
    else if (line.p1.y > line.p2.y) { return swap(line); }
    return line;
}

//lineLT: Line Line -> Bool
function lineLT(line1, line2) {
    "use strict";
    if (line1.p1.x < line2.p1.x) { return true; }
    else if (line1.p1.x > line2.p1.x) { return false; }
    else if (line1.p1.y < line2.p1.y) { return true; }
    else if (line1.p1.y > line2.p1.y) { return false; }
    else if (line1.p2.x < line2.p2.x) { return true; }
    else if (line1.p2.x > line2.p2.x) { return false; }
    else if (line1.p2.y < line2.p2.y) { return true; }
    else if (line1.p2.y > line2.p2.y) { return false; }
    else { return true; }
}

//pointEqual: Line Line -> Bool
function pointEqual(point1, point2) {
    "use strict";
    return ((point1.x === point2.x) && (point1.y === point2.y));
}

//lineEqual: Line Line -> Bool
function lineEqual(line1, line2) {
    "use strict";
    return (((pointEqual(line1.p1, line2.p1)) && (pointEqual(line1.p2, line2.p2))) ||
            ((pointEqual(line1.p1, line2.p2)) && (pointEqual(line1.p2, line2.p1))));
}

//graphEqual: Graph Graph -> Bool
function graphEqual(graph1, graph2) {
    "use strict";
    graph1 = map(arrangePoints, graph1);
    graph2 = map(arrangePoints, graph2);
    graph1.sort(lineLT);
    graph2.sort(lineLT);
    if (graph1.length !== graph2.length) { return false; }
    for(var i = 0; i < graph1.length; i += 1) {
        if (!(lineEqual(graph1[i], graph2[i]))) { return false; }
    }
    return true;
}

//solutionEqual: Level UserSolution -> Bool
function solutionEqual(level, usersolution) {
    "use strict";
    return graphEqual(level.solution, usersolution.solution);

}
