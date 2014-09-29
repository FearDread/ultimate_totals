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
      get_all_bets:function(){
        var sql = "select * from bets";
        var res = DB.query(sql);

        if(res){
          console.log(res);
          return res;
        }
      },
      save_bet:function(){
        var sql = "INSERT INTO Bets (type,pick,date,comment,market,stakes,odds,result,payout)" 
        + "VALUES ('" + this.get('type') + "','" + this.get('pick') + "','" + this.get('date') + "',"
        + "'" + this.get('comment') + "','" + this.get('market') + "','" + this.get('stakes') + "',"
        + "'" + this.get('odds') + "','" + this.get('result') + "','" + this.get('payout') + "')";

        var res = DB.query(sql);
        if(res){
          return res;
        }
      }
    });

    return Bet;
  }
);
