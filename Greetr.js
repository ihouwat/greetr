(function (global, $) {

  // This construction approach mimics jQuery's architecture

  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  }


  // These variables are hidden within the scope of the IIFE and never directly accessible
  // closure allows Greetr.init to have access to this memory space

  // supported languages
  var supportedLangs = ['en', 'es'];

  // informal greetings
  var greetings = {
      en: 'Hello',
      es: 'Hola'
  };

  // formal greetings
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  // logger messages
  var logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };


  // Greetr object methods
  Greetr.prototype = {

    // Return full name
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    // Validate language
    validate: function() {
      // references the externally inaccessible 'supportedLangs' within the closure
      if(supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      };
    },

    // Returns informal greeting from object
    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    // Returns formal greeting
    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName() + '.';
    },

    // greet method which will be used in the app
    greet: function(formal) {
      var msg; 

      // if undefined or null it will be coerced to 'false'
      if (formal) {
        msg = this.formalGreeting();
      }
      else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    // for console logging
    log: function() {
      if(console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      // make chainable
      return this;
    },

    setLang: function(lang) {

      // set the language
      this.language = lang;

      // validate
      this.validate();

      // make chainable
      return this;
    },

    
    HTMLGreeting: function(selector, formal) {
      // Checking for jQuery
      if (!$) {
        throw 'jQuery not loaded';
      }

      if (!selector) {
        throw 'Missing jQuery selector';
      }

      // determine the message
      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg.this.greeting();
      }

      // use jQuery to inject the message in the chosen place in the DOM
      $(selector).html(msg);

      // make chainable
      return this;
    }

  };


  // Function constructor to build a new object, allowing us to build a 'new' object without calling 'new;
  Greetr.init = function(firstName, lastName, language) {

    // Initialization includes default values if you don't pass all arguments
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    // Validate the language on object creation
    self.validate();

  }

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  Greetr.init.prototype = Greetr.prototype;


  // attach our Greetr to the global object, and provide a shorthand '$G' for ease of typing
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));