define('bet', function(){

  var Bet = Backbone.Model.extend({
    defaults:{
      name:'bet',
    }
  });

  return Bet;
});
