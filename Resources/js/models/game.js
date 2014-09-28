define('game',[
 'DB'
], function(DB){

  var Game = Backbone.Model.extend({
    defaults:{
      date:null,
      home:{},
      away:{},
      total:0,
    },
    save_game:function(){
      var sql = 'insert into Game (date,home,away,home_score,away_score,total) '
      + 'values ("' + this.get('date') + '","' + this.get('home').get('name') + '","' 
      + this.get('away').get('name') + '",' + this.get('home').get('score') + ',' + this.get('away').get('score') + ','
      + this.get('total') + ')';

      DB.query(sql);
    },
    get_all_games:function(){
      var sql = 'select * from Games';
      var res = DB.query(sql);

      if(res){
        return res;
      }
    }
  });

  return Game;
});
