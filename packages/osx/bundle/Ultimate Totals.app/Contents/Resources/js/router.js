define('router',[
  'jquery',
  'underscore',
  'backbone',
  'app'
],function($, _, Backbone, app){
  
    var Router = Backbone.Router.extend({
      routes:{
        '/':'initDB', 
        '*actions':'default'
      }
    });

    var init = function(){
      var app_router = new Router;

      app_router.on('initDB', function(){
        app.log('init database here ... ');
      
      });

      app_router.on('default', function(){
        app.log('No Route!');
      });

      Backbone.history.start();
    }

    return {
      init:init 
    }
  }
);
