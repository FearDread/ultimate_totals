/*--------------------------------*
 * @title: Application Init 
 * @author: Garrett Haptonstall
*---------------------------------*/
require.config({
  baseUrl: 'js',
  paths: {
    // router //
    router:'router',
    // main application modules //
    app:'../src/app',
    menu:'../src/menu',
    utils:'../src/utils',
    table:'../src/table',
    // libraries //
    jquery:'libs/jquery/jquery.min',
    sorter:'libs/jquery/plugins/jquery.tablesorter.min',
    backbone:'libs/backbone/backbone-min',
    underscore:'libs/underscore/underscore-min',
    // models //
    bet:'models/bet',
    team:'models/team',
    // collections //
    teams:'collections/teams',
    // modules //
    stats:'modules/stats',
    help:'modules/help',
    bets:'modules/bets',
    totals:'modules/totals',
    // views //
    stats_view:'views/stats-view',
    help_view:'views/help-view',
    totals_view:'views/totals-view',
    bets_view:'views/bets-view'
  },
  shim: {
    jquery:{
      exports:'$'
    },
    underscore:{
      exports:'_' 
    },
    backbone:{
      deps:['jquery','underscore'],
      exports:'Backbone' 
    },
    sorter:{
      deps:['jquery'],
      exports:'tableSorter'
    }
  }
});
require([
  'app',
  'menu'
],function(app, menu){
    menu.init();
    app.init();
  }
);