define([
  'js/globals',
  'js/routers/routers.master',
  'js/views/views.home',
  'js/views/views.map',
], function(Globals, Master, Home, Map){

  return Master.extend({

    routes: {
      'map': 'map',
      '*actions' : "home"
    },

    home: function(){

      this.newPage = {
        view: new Home()
      };

    },

    map: function(){

      this.newPage = {
        view: new Map()
      };

    }

  });

});