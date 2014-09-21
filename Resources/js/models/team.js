define(['team'], function(){

  var Team = Backbone.Model.extend({
    defaults:{
      name:'Team',
      home:[],
      away:[],
      scores:[],
      model:{
        'pflt':0,
        'palt':0,
        'hpat':0,
        'hpft':0,
        'apat':0,
        'apft':0,
        'total':0
      },
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
