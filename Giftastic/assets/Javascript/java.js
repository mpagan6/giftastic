 $(document).ready(function(){

 // Initial array of show GIF's
 var adultShow = ["Family Guy", "The Simpsons", "Archer", "Rick and Morty"];

 // displayGIF function re-renders the HTML to display the appropriate content
 function displayGiphy() {
    var myAPI= '&api_key=7zHrOq4p15SZAsoqYjWTSZuhHy5YhtK2'
    var giphy = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + adultShow + myAPI  +"&limit=10";

   // Creating an AJAX call for the specific GIF button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
       
    // clears out prior GIFs
    $("#gif-view").html('');

    var counter;

    

     // Creating a div to hold the GIF
     var gifDiv = $("<div class='giphy'>");

     // Storing the rating data
     var rating = response.Rated;

     // Creating an element to have the rating displayed
     var pOne = $("<p>").text("Rating: " + rating);

     // Displaying the rating
     gifDiv.prepend(pOne);

      // Creating an element to hold the image
     var image = $("<img>").attr("src", queryURL);

     // Appending the image
     gifDiv.prepend(image);

     // Putting the entire movie above the previous movies
     $("#gif-view").prepend(gifDiv);
   });

 }

 // Function for displaying giphy data
 function renderButtons() {

   // Deleting the movies prior to adding new movies
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of movies
   for (var i = 0; i < gifArray.length; i++) {

     // Then dynamicaly generating buttons for each movie in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var a = $("<button>");
     // Adding a class of movie-btn to our button
     a.addClass("gif-btn");
     // Adding a data-attribute
     a.attr("data-name", gifArray[i]);
     // Providing the initial button text
     a.text(gifArray[i]);
     // Adding the button to the buttons-view div
     $("#buttons-view").append(a);
   }
 }

 // This function handles events where a movie button is clicked
 $("#add-giphy").on("click", function(event) {
   event.preventDefault();
   // This line grabs the input from the textbox
   var giphy = $("#giphy-input").val();

   // Adding movie from the textbox to our array
   giphy.push(gifArray);

   // Calling renderButtons which handles the processing of our movie array
   renderButtons();
 });

 // Adding a click event listener to all elements with a class of "movie-btn"
 $(document).on("click", ".gif-btn", displayGiphy);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();