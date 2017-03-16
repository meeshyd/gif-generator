var topics = [
"kramer",
"elaine",
"jerry seinfeld",
"newman",
"george costanza",
];

var $buttonDiv = $("#buttons-div");
var $addGif = $("#add-gif");
var $gifContainer = $("#gif-container");
var $button;

function createButtons() {
	$buttonDiv.empty();
	for (var i=0; i<topics.length; i++) {
		$button= $("<button>").addClass("gif-button").text(topics[i]).attr("data-name", topics[i]);
		$buttonDiv.append($button);
	};
};

createButtons();

function displayGifs() {
	$gifContainer.empty();
	var dataName = $(this).attr("data-name")
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+dataName+"&api_key=dc6zaTOxFJmzC&limit=10"

	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {
		console.log (response.data)
		var giphyResults = response.data;

		for (i=0; i<giphyResults.length; i++) {
			var $gifDiv = $("<div>").addClass("gif-div");
			var $p = $('<p>').text("Rating: " + giphyResults[i].rating);
			var $gif = $("<img>").addClass("gif").attr("src",giphyResults[i].images.fixed_width_still.url).attr("data-animate",giphyResults[i].images.fixed_width.url).attr("data-still", giphyResults[i].images.fixed_width_still.url).attr("data-state", "still");
			$gifDiv.append($p);
			$gifDiv.append($gif);
			$gifContainer.append($gifDiv);
		};
		$(".gif").on("click", function() {
      		var state = $(this).attr("data-state");

      		if (state == "still") {
        		$(this).attr("src", $(this).attr("data-animate"));
        		$(this).attr("data-state", "animate");
      		}else{
        		$(this).attr("src", $(this).attr("data-still"));
        		$(this).attr("data-state", "still");
    		};
		});
	});
};


$addGif.on("click",function(event) {
	event.preventDefault();

	var userSearch = $("#gif-input").val().trim();
	topics.push(userSearch);
	createButtons();
});

$(document).on("click", ".gif-button", displayGifs);
