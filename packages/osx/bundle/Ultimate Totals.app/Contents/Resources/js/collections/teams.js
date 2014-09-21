define('teams',[
  'underscore',
  'backbone',
  'team'
],function(_, Backbone, Team){

    var Teams = Backbone.Collection.extend({
      model:Team,
      getTeam:function(idx){
        return this.model[idx];
      }
    });

    return Teams;
  }
);
