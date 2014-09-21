define('teams',[
  'underscore',
  'backbone',
  'team'
],function(_, Backbone, team){

  var teams = Backbone.Collection.extend({
    model:team,
    getTeam:function(idx){
      return this.model[idx];
    }
  });

  return teams;
});
