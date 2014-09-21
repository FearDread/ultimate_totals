define('team',[
  'jquery',
  'underscore',
  'backbone'
],function($, _, Backbone){

  var Team = Backbone.Model.extend({
    defaults:{
      name:'Team',
      scores:[],
      home_scores:[],
      away_scores:[],
      combined:function(){
        var as = [];

        $.merge(as, this.scores);
        $.merge($.merge(as, this.away_scores), this.home_scores);

        return as;
      }
    }
  });

  return Team;
});
