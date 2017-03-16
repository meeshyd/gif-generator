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

function diplayGifs() {
	$gifContainer.empty();
	var dataName = $(this).attr("data-name")
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+dataName+"&api_key=dc6zaTOxFJmzC&limit=10"

	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {

		var giphyResults = response.data;

		for (i=0; i<giphyResults.length; i++) {
			var $gifDiv = $("<div>");
			var $p = $('<p>').text("Rating: " + giphyResults[i].rating);
			var $catGif = $("<img>").addClass("gif").attr("src",giphyResults[i].images.fixed_height.url);
			$gifDiv.append($p);
			$gifDiv.append($catGif);
			$gifContainer.append($gifDiv);
		};
	});
};

$addGif.on("click",function(event) {
	event.preventDefault();

	var userSearch = $("#gif-input").val().trim();
	topics.push(userSearch);
	createButtons();
});

$(document).on("click", ".gif-button", diplayGifs);

createButtons();
