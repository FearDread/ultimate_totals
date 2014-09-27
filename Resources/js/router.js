define('router',[
  'jquery',
  'underscore',
  'backbone',
],function($, _, Backbone){
  
    var Router = Backbone.Router.extend({
      routes:{
        'stats':'stats',
        '*default':'load',
      },
      load:function(req){
        if(req != null){
          app.load_module(req);
        }
      },
      stats:function(){
        var url = 'https://api.sportsdatallc.org/nba-t3/seasontd/2013/reg/standings.xml?api_key=' + app.NBAKey;
        $.get(url, function(res){
          app.data = res;
          app.load_module('stats');
        });
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
