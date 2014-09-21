define('game',[
  'underscore',
  'backbone'
],function(_, Backbone){

  var game = Backbone.Model.extend({
    defaults:{
      name:'Game',
      score:0 
    }
  });

  return game;
});
