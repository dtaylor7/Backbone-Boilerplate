define([
  'js/globals',
  'js/views/views.master',
  'text!templates/header.html',
], function(Globals, Master, template){

  return Master.extend({

    templates: {
      'main' : template,
    },

    el: 'header',

    initialize: function(){

      this._super();
      
      return this.render();

    }

  });

});