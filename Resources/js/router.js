define('router',[
  'jquery',
  'underscore',
  'backbone',
],function(){
  
    var Router = Backbone.Router.extend({
      routes:{
        '/':'test', 
        '/stats':'stats',
        '*actions':'default'
      }
    });

    var init = function(){
      var app_router = new Router();

      app_router.on('test', function(){
        console.log('test route hit in router'); 
      });

      app_router.on('DB', function(){
        app.log('init database here ... ');
      
      });

      app_router.on('default', function(){
        app.log('No Route!');
      });

      app_router.on('stats', function(){
        var stats = {};
        console.log('stats hit in router'); 
        return stats;
      });

      Backbone.history.start();
      console.log(app_router);
      return app_router;
    }

    return {
      init:init 
    }
  }
);
