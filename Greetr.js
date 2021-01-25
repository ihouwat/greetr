(function (global, $) {

  // This approach mimics jQuery's architecture

  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  }

  // Greetr object methods
  Greetr.prototype = {};

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