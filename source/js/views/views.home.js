define([
  'js/globals',
  'js/views/views.master',
  'text!templates/home.html',
], function(Globals, Master, template){

  return Master.extend({

    templates: {
      'main': template
    }

  });

});