//Main module 
//written by: Peter Fryer Davis & Luke Brown


cards.ready(function(){    //Force portrait mode
	if ( cards.browser){
	  cards.browser.setOrientationLock('portrait');
	}
});


//Constants definition and canvas set up
//----------------------------------------

var WIDTH = window.innerWidth,										 //Document width
    hintStartLeft = WIDTH/2 - 110,									 //Hint Box position from left
    CANVASWIDTH = WIDTH - 30,										 //Canvas width
    gameCanvas = document.getElementById("gameCanvas"); 		     //Canvas

gameCanvas.width = CANVASWIDTH;
gameCanvas.height = CANVASWIDTH;
document.getElementById('gameCanvas').width = CANVASWIDTH;
document.getElementById('hintbox').style.left = hintStartLeft + "px";

testFrameRate (gameCanvas, gameCanvas.getContext("2d"), true);

$('.hintBox').toggle();				//Shows the hintBox when the level loads


//Home Page
//---------

App.populator('home', function (page) {
	console.log("loaded home");
	if (App.getStack().length > 2) { 
		for (var i = 0; i < App.getStack().length; i += 1) { App.removeFromStack(1); }
	}
});


//Game Page
//----------

App.populator('game', function (page) {
	console.log("loaded game");	
	$(page).find('.pencil')[0].className = "app-button tools-Active pencil"; // Default highlighted pencil

	$(page).on('appShow', function () {
		//This runs every time the page becomes visible to the user and is done animating

		//Variable/Constant Definition, level set up
		//--------------------------------------------

		var gameCanvas = document.getElementById("gameCanvas"); 		         //Canvas
		if(gameCanvas.getContext) { var context = gameCanvas.getContext("2d"); } //Context
		loadLevel(gameCanvas, context);
		setTimeout(function() { $('.hintBox').toggle(); },150);


		//Buttons
		//-------
	
		$(page).find('.pencil').on('click', function () { 
			activateDrawMode(); 
			if(this.className === "app-button tool pencil") {
				this.className = "app-button tools-Active pencil";
				$(page).find('.eraser')[0].className = "app-button tool eraser";
			}
		});
	    $(page).find('.eraser').on('click', function () {
	    	activateEraseMode();
	    	if(this.className === "app-button tool eraser") {
				this.className = "app-button tools-Active eraser";
				$(page).find('.pencil')[0].className = "app-button tool pencil";
			}
	    });
	    $(page).find('.rotate'         ).on('click', function () { rotateGraph(gameCanvas, context, -1);  });
	    $(page).find('.flip'           ).on('click', function () { flipGraph(gameCanvas, context, true);  });
	    $(page).find('.undo'           ).on('click', function () { undo(gameCanvas, context);             });
		$(page).find('.check'          ).on('click', function () { 
			if (checkSolution(gameCanvas, context)) { setTimeout(function() {$('.hintBox').toggle();}, 150); } 
		});
	    $(page).find('.reset'          ).on('click', function () { resetGraph(gameCanvas, context);    });
	    $(page).find('.app-button.left').on('click', function () { activateDrawMode();                 });

		$('.hint' ).click(function() { $('.hintBox').toggle(); });
		$('.close').click(function() { $('.hintBox').toggle(); });

	    //Interactive Drawing
	    //-------------------

	    var startPoint = "",
	    	tmpPoint = "",
	    	mouseDown = false,
	    	rotationRightBool = false,
	    	rotationLeftBool = false;

	    /* var options = {
	            text: "Luke is awesome",  // String
	            duration: 2000 // Integer
        	};

        	var toast = new Toast(options);*/

	    //document.addEventListener(  "mousedown"  , mouseDownEvent, false);
	    //document.addEventListener(  "mouseup"    , mouseUpEvent  , false);
	    //document.addEventListener(  "mousemove"  , mouseMoveEvent, false);
	    gameCanvas.addEventListener("mousedown"  , mouseDownEvent, false);
	    gameCanvas.addEventListener("mouseup"    , mouseUpEvent  , false);
	    gameCanvas.addEventListener("mousemove"  , mouseMoveEvent, false);
	    //gameCanvas.addEventListener("dblclick"   , doubleHitEvent, false);
	    Hammer(gameCanvas).on(      "doubletap"  , doubleHitEvent);
	    Hammer(gameCanvas).on(      "rotate"     , rotateEvent);
	    document.addEventListener(  "touchstart" , touchHandler  , true);
	    document.addEventListener(  "touchmove"  , touchHandler  , true);
	    document.addEventListener(  "touchend"   , touchHandler  , true);
	    document.addEventListener(  "touchcancel", touchHandler  , true);
	  
	    //Mouse Interactive Drawing:
	    function mouseDownEvent(event) {
	    	"use strict";
			startPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASWIDTH);
			console.log("Start Point: = ", startPoint);
	    	mouseDown = true;
	    }

	    function mouseMoveEvent(event) {
	    	"use strict";
	    	if (!mouseDown || !inEraseMode || rotationLeftBool || rotationRightBool) return;
	    	tmpPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASWIDTH);
	    	removeLine(tmpPoint, gameCanvas, context);
	    }

    	function mouseUpEvent(event) {
    		"use strict";
    		mouseDown = false;
    		if  (rotationRightBool) {
    			rotateGraph(gameCanvas, context, -1);
    			rotationRightBool = false;
    		}
    		else if (rotationLeftBool) {
    			rotateGraph(gameCanvas, context, 1);
    			rotationLeftBool = false;
    		}
    		else if (startPoint !== "") {
				var endPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASWIDTH);
		    	console.log("End Point: = ", endPoint);
		    	var newLine = new Line(startPoint, endPoint, "User");

		    	if (inDrawMode)  {    addLine(newLine, gameCanvas, context); }
		    	//if (inEraseMode) { removeLine(newLine, gameCanvas, context); }
		    }
		    startPoint = "";
	    }

	    function doubleHitEvent(event) {
	    	"use strict";
	    	flipGraph(gameCanvas, context);
	    }


	    //Touch non drawing events
	    function rotateEvent(event) {
	    	"use strict";
	    	if (event.gesture.touches.length === 2) {
	    		if (!rotationRightBool && !rotationLeftBool) { 
	        		if (event.gesture.rotation > 0) rotationRightBool = true;
	        		else        					rotationLeftBool  = true;
	       		}
	      	}
	    }


	    //Touch interactive Drawing (simulates mouse):
	    function touchHandler(event) {
	    	"use strict";
		    var touchLst = event.changedTouches,
		        fst = touchLst[0],
		        touchType = "";
		    
		    if (touchLst.length === 1) {
		    	switch(event.type) {
			        case "touchstart": touchType = "mousedown"; break;      
			        case "touchend"  : touchType = "mouseup"  ; break;
			        case "touchmove" : touchType = "mousemove"; break;
			        default: return;
		    	}
		    } else if (touchLst.length === 2) {
		    	switch(event.type) {     
			        case "touchend"  : touchType = "mouseup"  ; break;
			        default: return;
			    }
		    }

		    var mouseSimulatedEvent = document.createEvent("MouseEvent");
		    mouseSimulatedEvent.initMouseEvent(touchType, true, true, window, 1, fst.screenX, fst.screenY, 
		                              fst.clientX, fst.clientY, false, false, false, false, 0/*left*/, null);

		    fst.target.dispatchEvent(mouseSimulatedEvent);
		    event.preventDefault();
		}
	    
	});
});


//Levels Page
//------------

App.populator('levels', function (page) {

	$(page).on('appShow', function () {
		console.log("loaded levels");
		$(page).find('.lvl1' ).on('click', function () { currLevelNum = 1;  });
		$(page).find('.lvl2' ).on('click', function () { currLevelNum = 2;  });
		$(page).find('.lvl3' ).on('click', function () { currLevelNum = 3;  });
		$(page).find('.lvl4' ).on('click', function () { currLevelNum = 4;  });
		$(page).find('.lvl5' ).on('click', function () { currLevelNum = 5;  });
		$(page).find('.lvl6' ).on('click', function () { currLevelNum = 6;  });
		$(page).find('.lvl7' ).on('click', function () { currLevelNum = 7;  });
		$(page).find('.lvl8' ).on('click', function () { currLevelNum = 8;  });
		$(page).find('.lvl9' ).on('click', function () { currLevelNum = 9;  });
		$(page).find('.lvl10').on('click', function () { currLevelNum = 10; });
		$(page).find('.lvl11').on('click', function () { currLevelNum = 11; });
		$(page).find('.lvl12').on('click', function () { currLevelNum = 12; });
		$(page).find('.lvl13').on('click', function () { currLevelNum = 13; });
		$(page).find('.lvl14').on('click', function () { currLevelNum = 14; });
		$(page).find('.lvl15').on('click', function () { currLevelNum = 15; });
		$(page).find('.lvl16').on('click', function () { currLevelNum = 16; });
		$(page).find('.lvl17').on('click', function () { currLevelNum = 17; });
		$(page).find('.lvl18').on('click', function () { currLevelNum = 18; });
	});
});

(function()
{
  	if( window.localStorage )
  	{
   		if( !localStorage.getItem( 'firstLoad' ) )
   		{
    		localStorage[ 'firstLoad' ] = true;
    		//document.getElementById("hintText").innerHTML = "This is your first time playing Symbolize.  Would you like to go to the Tutorial?";
    		//$('.hint' ).click(function() { $('.hintBox').toggle(); });
     		App.load('tut1'); //Game start up
   		}  
    	else {
      		localStorage.removeItem( 'firstLoad' );
  			App.load('home'); //Game start up
  		}
  	}
})();