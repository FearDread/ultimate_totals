define(['game'], function(){

  var Game = Backbone.Model.extend({
    defaults:{
      date:null,
      home:'Team',
      away:'Team',
      final:0,
      save_game:function(){
      
      }
    }
  });

  return Game;
});
