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
    app:'src/app',
    menu:'src/menu',
    utils:'src/utils',
    table:'src/table',
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
  },
  // export globals //
  shim: {
    jquery:{
      exports:'$'
    },
    underscore:{
      exports:'_' 
    },
    backbone:{
      exports:'Backbone',
      deps:['jquery','underscore']
    },
    sorter:{
      exports:'tableSorter',
      deps:['jquery']
    },
    table:{
      exports:'table'
    }
  }
});
require([
  'app',
  'menu'
],function(app, menu){

    /* Itiialize Platform Menu */
    menu.init();

    /* Initialize Application */
    app.init();

  }
);
