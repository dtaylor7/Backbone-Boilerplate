require([
  'config'
], function(){

  // Specific config
  require.config({

    baseUrl: ".",

    paths: {
      "root": "."
    }

  });

  // Start app
  requirejs([
    'js/globals',
    // Libs
    'jquery',
    'underscore',
    'backbone',
    // Initialize scripts
    'js/routers/routers.main',
    'js/views/views.header',
    'backbone-super',
    'velocity',
    'velocity-ui'
  ], function(Globals, $, _, Backbone, Router, Header){

    Globals.Router = new Router();

    Globals.Events = _.extend({}, Backbone.Events);

    Globals.Views.Header = new Header();

    Backbone.history.start({ pushState: false });

  });

});
