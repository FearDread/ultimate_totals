define('router',[
  'jquery',
  'underscore',
  'backbone',
],function($, _, Backbone){
  
    var Router = Backbone.Router.extend({
      routes:{
        'stats':'stats'
      },
      stats:function(){
        var s = {};

        console.log('stats called in app router.');
      }
    });

    var initialize = function(){
      var app_router = new Router();

      Backbone.history.start();
    }

    return {
      initialize:initialize
    }
  }
);
