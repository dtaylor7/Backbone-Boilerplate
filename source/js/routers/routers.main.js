define([
  'js/globals',
  'js/routers/routers.master',
  'js/views/views.home',
], function(Globals, Master, Home){

  return Master.extend({

    routes: {
      '*actions' : "home"
    },

    home: function(){
    
      this.newPage = {
        view: new Home()
      };

    }

  });

});