require([
  'config'
], function(){

  var config = {

    baseUrl: ".",

    paths: {
      "root": "."
    }

  };

  requirejs.config(config);

  // Start app
  requirejs([
    'js/globals',
    'jquery',
    'underscore',
    'backbone',
    'backbone-super',
    // Initialize scripts
    'js/routers/routers.main',
    'js/views/views.header',
    'velocity',
    'velocity-ui'
  ], function(Globals, $, _, Backbone, Super, Router, Header){

    Globals.Router = new Router();

    Globals.Events = _.extend({}, Backbone.Events);

    Globals.Views.Header = new Header();

    Backbone.history.start({ pushState: false });

  });

});
