define('teams',[
  'team'
],function(Team){

    var Teams = Backbone.Collection.extend({
      model:Team,
      getTeam:function(idx){
        return this.model[idx];
      }
    });

    return Teams;
  }
);
