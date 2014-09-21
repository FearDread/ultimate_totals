define('bet',[
  'DB'
],function(DB){

    var Bet = Backbone.Model.extend({
      defaults:{
        id:0,
        type:'bet',
        date:null,
        time:null,
        comment:'',
        market:'totals',
        stakes:null,
        odds:null,
        result:'pending',
        payout:0
      },
      save_bet:function(){
        var sql = "INSERT INTO Bets VALUES "
        + "(default,'" + this.get('type') + "','" + this.get('pick') + "','" + this.get('date') + "',"
        + "'" + this.get('comment') + "','" + this.get('market') + "','" + this.get('stakes') + "',"
        + "'" + this.get('odds') + "','" + this.get('result') + "','" + this.get('payout') + "')";
        console.log(sql);
      
        var res = DB.query(sql);
        console.log(res);
      }
    });

    return Bet;
  }
);
