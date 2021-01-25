(function (global, $) {

  // This construction approach mimics jQuery's architecture

  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  }


  // These variables not exposed to the global object
  // closure allows Greetr.init to have access to this memory space
  var supportedLangs = ['en', 'es'];

  var greetings = {
      en: 'Hello',
      es: 'Hola'
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

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
      if(supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      };
    },

    // Returns informal greeting
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

      return this;
    },

    setLang: function(lang) {
      this.language = lang;

      this.validate();

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

      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg.this.greeting();
      }

      // use jQuery
      $(selector).html(msg);

      // make method chainable
      return this;
    }

  };


  // Function constructor to build a new object
  // Includes default values if you don't pass all arguments
  Greetr.init = function(firstName, lastName, language) {

    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

  }

  Greetr.init.prototype = Greetr.prototype;


  // Exposing Greetr function to the global object
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));