define('router',[
  'jquery',
  'underscore',
  'backbone',
],function($, _, Backbone){
  
    var Router = Backbone.Router.extend({
      routes:{
        '*default':'load',
      },
      load:function(req){
        if(req != null){
          app.load_module(req);
        }
      }
    });

    var init = function(){
      var app_router = new Router();

      Backbone.history.start();
    }

    return {
      init:init
    }
  }
);
