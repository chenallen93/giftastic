var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab"];

function displayImage() {

	var animalName = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";

	$("#animalsgo").empty();

  $.ajax({
  	url: queryURL,
       method: "GET"
  }).done(function(response) {

  	for (var i=0; i<response.data.length; i++){


    	var rating = response.data[i].rating;
    	var imageAnimated = response.data[i].images.fixed_height.url;
      var imageStill = response.data[i].images.fixed_height_still.url;

    	var p = $('<p>').html('Rating: ' + rating)
     

    	var img = $('<img>').attr('src', imageAnimated);
        img.addClass("animalGifs");
        img.attr("data-state", "animate");
        img.attr("data-still", imageStill);
        img.attr("data-animate", imageAnimated);
          
      var div = $("<div>");
        div.addClass("col-md-10 col-md-offset-1");
        div.append(img);
    		div.append(p);
        
      $('#animalsgo').append(div);

      }

  });
}


function createButtons() {

	for (var i = 0; i < animals.length; i++) {
		var a = $("<button>");
		  a.addClass("theAnimal");
		  a.attr("data-name", animals[i]);
		  a.text(animals[i]);
		  $("#animalButtons").append(a);
	}
}


$("#addAnimal").on("click", function(event) {

	$("#animalButtons").empty();
	event.preventDefault();
	var newAnimal = $("#animal-input").val().trim();
	animals.push(newAnimal);
	createButtons();

  $("#animal-input").val('');
});


$(document).on("click", ".theAnimal", displayImage) 
      createButtons();


$(document).on("click", ".animalGifs", function(){

      var state = $(this).attr("data-state");

      if (state == "animate") {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      } else {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      }
 });

