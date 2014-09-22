define('bets',[
  'DB',
  'bet'
],function(DB, Bet){

    var Bets = Backbone.Collection.extend({
        model:Bet,
    });

    return Bets;
  }
);
