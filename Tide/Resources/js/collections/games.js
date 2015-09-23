define('games',[
  'DB',
  'game'
],function(DB, Game){

    var Games = Backbone.Collection.extend({
      model:Games,
      get_game:function(idx){
        return this.model.get(idx);
      },
      get_all_games:function(){
      
      }
    });

    return Games;
  }
);
