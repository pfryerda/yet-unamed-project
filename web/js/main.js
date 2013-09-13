
//Need to make a function that allows me to highlight the current tool and deselect the other tools.


App.populator('home', function (page) {
	console.log("loaded home");
});

App.populator('game', function (page) {
	console.log("loaded game");

	$(page).find('.pencil').on('click', function () {
		console.log("pencil");
    });

	$(page).find('.clear').on('click', function () {
		console.log("clear");
		App.dialog({
				title        : "Quit Level?",
				text         : "This will not save your progress so far.  Are you sure you want to do this?",
				quitButton   : "Quit",
				cancelButton : "Cancel"
			}, function (result) {

			if (result ===  "quit") {
				App.load("levels")
			}
		});
    });

    $(page).find('.reset').on('click', function () {
		console.log("reset");
		App.dialog({
				title        : "Quit Level?",
				text         : "This will not save your progress so far.  Are you sure you want to do this?",
				quitButton   : "Quit",
				cancelButton : "Cancel"
			}, function (result) { //result is a string

			if (result ===  "quit") {
				App.load("levels")
			}
		});
    });
});

App.populator('levels', function (page) {
	console.log("loaded levels");
});

try {
App.restore();
}
catch (err) {
App.load('game');
}
