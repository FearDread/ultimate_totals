define(['team'], function(){

  var Team = Backbone.Model.extend({
    defaults:{
      name:'Team',
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
      save_team:function(){

      }
    }
  });

  return Team;
});
