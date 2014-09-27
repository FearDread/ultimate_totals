define('router',[
  'jquery',
  'underscore',
  'backbone',
],function($, _, Backbone){
  
    var Router = Backbone.Router.extend({
      routes:{
        'totals':'totals',
        'betting':'bets',
        'stats':'stats',
        'formulas':'formulas',
        'database':'database',
        'reports':'reports'
      },
      totals:function(){
        app.load_module('totals');
      },
      bets:function(){
        app.load_module('betting');
      },
      stats:function(){
        var url = 'https://api.sportsdatallc.org/nba-t3/seasontd/2014/reg/standings.xml?api_key=' + app.NBAKey;
        $.get(url, function(res){
            app.data = res;
            app.load_module('stats');
          }
        );
      },
      formulas:function(){
        app.load_module('formulas');
      },
      database:function(){
        app.load_module('database');
      },
      reports:function(){
        app.load_module('reports');
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
