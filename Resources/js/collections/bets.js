define('bets',[
  'DB',
  'bet'
],function(DB, Bet){

    var Bets = Backbone.Collection.extend({
        model:Bet,
        get_all_bets:function(){
          var sql = "SELECT * FROM Bets";
          var results = DB.query(sql);
          console.log(results); 
        }
    
    });

    return Bets;
  }
);
