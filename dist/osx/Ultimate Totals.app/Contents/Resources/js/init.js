/*--------------------------------*
 * @title: Application Init 
 * @author: Garrett Haptonstall
*---------------------------------*/
require.config({
  baseUrl: 'js',
  paths: {
    // DB //
    DB:'DB',
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
    bets:'collections/bets',
    // modules //
    stats:'modules/stats',
    help:'modules/help',
    betting:'modules/bets',
    totals:'modules/totals',
    database:'modules/database',
    reports:'modules/reports',
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
  'menu',
  'DB'
],function(app, menu, DB){
    /* Setup DB */
    DB.create();

    /* Itiialize Platform Menu */
    menu.init();

    /* Initialize Application */
    app.init();

  }
);
