/*--------------------------------*
 * @title: Application Init 
 * @author: Garrett Haptonstall
*---------------------------------*/
require.config({
  baseUrl: 'js',
  paths: {
    // libraries //
    jquery:'libs/jquery/jquery.min',
    backbone:'libs/backbone/backbone-min',
    underscore:'libs/underscore/underscore-min',
    // DB //
    DB:'DB',
    // router //
    router:'router',
    // main application modules //
    app:'src/app',
    menu:'src/menu',
    sdata:'src/sdata',
    utils:'src/utils',
    table:'src/table',
    // models //
    bet:'models/bet',
    team:'models/team',
    game:'models/game',
    // collections //
    teams:'collections/teams',
    bets:'collections/bets',
    games:'collections/games',
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
