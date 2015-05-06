requirejs.config({

  paths: {

    // Libs
    "jquery": "lib/jquery/dist/jquery.min",
    "underscore": "lib/underscore/underscore-min",
    "backbone": "lib/backbone/backbone",
    "backbone-super": "lib/backbone-super/backbone-super/backbone-super-min",
    "velocity": "lib/velocity/velocity",
    "velocity-ui": "lib/velocity/velocity.ui.min",
    "jquery-mobile-events": "lib/jQuery-Mobile-Events/src/jquery.mobile-events.min",
    "spin": "lib/spin.spin",
    "text": "lib/requirejs-text/text",
    "json": 'lib/requirejs-plugins/src/json',
    
  },

  shim: {
    "underscore": { exports: "_" },
    "jquery": { exports: "$" },
    "jquery-mobile-events": { deps: ["jquery"] },
    "backbone": { exports: "Backbone", deps: ["underscore", "jquery"] },
    "velocity": { deps: ["jquery"] },
    "velocity-ui": { deps: ["velocity"] }
  }
  
});