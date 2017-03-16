var topics = [
"cosmo kramer",
"elaine benes",
"jerry seinfeld",
"george costanza",
];

var $buttonDiv = $("#buttons-div");
var $addGif = $("#add-gif");
var $gifContainer = $("#gif-container");
var $button;

//button creates buttons for each item in the topics array. the function also assigns the seinfeld-term attribute used in the displayGifs function to generate related gifs
function createButtons() {
	$buttonDiv.empty();
	for (var i=0; i<topics.length; i++) {
		$button= $("<button>").addClass("gif-button").text(topics[i]).attr("seinfeld-term", topics[i]);
		$buttonDiv.append($button);
	};
};

createButtons();

// when submit button is clicked, stores input in variable, pushes to array, and calls function that creates buttons
$addGif.on("click",function(event) {
	event.preventDefault();

	var userSearch = $("#gif-input").val().trim();
	
	topics.push(userSearch);
	
	$('#gif-input').val('');
	
	createButtons();
});

//when buttons with class gif-button are clicked, calls function that generates gifs from GIPHY API
$(document).on("click", ".gif-button", displayGifs);

//this function includes AJAX call to GIPHY API. it takes the Seinfeld term attribute assigned to the clicked button and displays 10 gifs related to that attribute
function displayGifs() {
	$gifContainer.empty();
	var seinfeldTerm = $(this).attr("seinfeld-term")
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+seinfeldTerm+"&api_key=dc6zaTOxFJmzC&limit=10"

	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {
		var giphyResults = response.data;
		//for loop to generate the 10 gifs returned from AJAX response data
		for (i=0; i<giphyResults.length; i++) {
			var $gifDiv = $("<div>").addClass("gif-div");
			var $p = $('<p>').text("Rating: " + giphyResults[i].rating);
			var $gif = $("<img>").addClass("gif").attr("src",giphyResults[i].images.fixed_width_still.url).attr("gif-animate",giphyResults[i].images.fixed_width.url).attr("gif-still", giphyResults[i].images.fixed_width_still.url).attr("gif-state", "still");
			$gifDiv.append($p);
			$gifDiv.prepend($gif);
			$gifContainer.append($gifDiv);
		};
		//this is a click event to pause and play gifs
		$(".gif").on("click", function() {
      		var state = $(this).attr("gif-state");

      		if (state == "still") {
        		$(this).attr("src", $(this).attr("gif-animate"));
        		$(this).attr("gif-state", "animate");
      		}else{
        		$(this).attr("src", $(this).attr("gif-still"));
        		$(this).attr("gif-state", "still");
    		};
		});
	});
};
