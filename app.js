// gets a new object (the arhcitecture allows us to not have to use the 'new' keyword here)
var g = G$('John', 'Doe');

// use our chainable methods
g.greet().setLang('es').greet(true).log();

// use our object on the click of the login button
$('#login').click(function() {

  // create a new 'Greetr' object (lets' pretend we know the name from the login)
  var loginGrtr = G$('John', 'Doe');

  // hide the login on the screen
  $('#logindiv').hide();

  // set the language based on what is chosed in the select box
  loginGrtr.setLang($('#lang').val())
    // chain a method to fire off an HTML greeting, passing the 'h1#greeting' as the selector and the chosen language
    .HTMLGreeting('#greeting', true)
      // log the message to the console
      .log();

});