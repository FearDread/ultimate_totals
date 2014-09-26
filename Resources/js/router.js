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
      console.log('router listening here');
      var app_router = new Router;

      app_router.on('initDB', function(){
        app.log('init database here ... ');
      
      });

      app_router.on('default', function(){
        app.log('No Route!');
      });

      app_router.on('/stats/data', function(){
        var stats = {};
      
        return stats;
      });

      Backbone.history.start();
    }

    return {
      init:init 
    }
  }
);
