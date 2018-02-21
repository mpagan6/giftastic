 $(document).ready(function(){

 // Initial array of show GIF's
 var adultShow = ["Family Guy", "The Simpsons", "Archer", "Rick and Morty"];

 // displayGIF function re-renders the HTML to display the appropriate content
 function displayGiphy() {
    var myAPI= '&api_key=7zHrOq4p15SZAsoqYjWTSZuhHy5YhtK2'
    var giphy = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + myAPI  +"&limit=10";

   // Creating an AJAX call for the specific GIF button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
       console.log("this is our return", response);
    // clears out prior GIFs
    $("#gif-view").html('');

    var counter;

    for (var i= 0; i< response.data.length; i++){

     // Creating a div to hold the GIF
     var gifDiv = $("<div class='giphy'>");

     // Storing the rating data
     var rating = response.data[i].rating;

     // Creating an element to have the rating displayed
     var pOne = $("<p>").text("Rating: " + rating);

     // Displaying the rating
     gifDiv.prepend(pOne);

      // Creating an element to hold the image
     var image = $("<img>").attr("src", response.data[i].images.original.url);
               image.attr("movingUrl", response.data[i].images.original.url);
               image.attr("stillUrl", response.data[i].images.original_still.url);
               image.attr("isMoving", true);
               image.attr("id", "gifImage");

     // Appending the image
     gifDiv.prepend(image);

     // Putting the giphy in div
     $("#gif-view").prepend(gifDiv);
    }
   });

 }

 // Function for displaying giphy data
 function renderButtons() {

   // 
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of movies
   for (var i = 0; i < adultShow.length; i++) {
    console.log("this is the adultshow" + adultShow[i]);
     // Then dynamicaly generating buttons for each movie in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var a = $("<button>");
     // Adding a class of movie-btn to our button
     a.addClass("gif-btn");
     // Adding a data-attribute
     a.attr("data-name", adultShow[i]);
     // Providing the initial button text
     a.text(adultShow[i]);
     console.log("what is being appended", a);
     // Adding the button to the buttons-view div
     $("#buttons-view").append(a);
   }
 }

 // This function handles events where a movie button is clicked
 $("#add-giphy").on("click", function(event) {
   event.preventDefault();
   // This line grabs the input from the textbox
   var giphy = $("#gif-input").val();

   // Adding  from the textbox to our array
   adultShow.push(giphy);

   // Calling renderButtons which handles the processing of our movie array
   renderButtons();
 });

 // Adding a click event listener to all elements with a class of "movie-btn"
 $(document).on("click", ".gif-btn", displayGiphy);
 $(document).on("click", "#gifImage", playPause);

 // Calling the renderButtons function to display the intial buttons
 renderButtons()

function playPause (){
  if ($(this).attr("isMoving") === true){
    console.log("its moving");
    $(this).attr("isMoving", false);
  } else {
    $(this).attr("isMoving", true);
    console.log ("it's not moving")
  }
  
}

});