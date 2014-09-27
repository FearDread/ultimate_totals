define('router',[
  'jquery',
  'underscore',
  'backbone',
],function($, _, Backbone){
  
    var Router = Backbone.Router.extend({
      routes:{
        'totals':'totals',
        'stats':'stats'
      },
      totals:function(){
        console.log('totals route hit.');
      
      },
      stats:function(){
        console.log('stats route hit.');
        var url = 'https://api.sportsdatallc.org/nba-trial3/seasontd/2014/reg/standings.xml?api_key=' + app.NBAKey;
        console.log($);
        console.log(url);
        $.get(url, function(res){
            console.log(url);
            console.log(res);
            app.stats_data = res;
        
          }
        );
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
