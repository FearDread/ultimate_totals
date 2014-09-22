define('teams',[
  'DB',
  'team'
],function(DB, Team){

    var Teams = Backbone.Collection.extend({
      model:Team,
      get_team:function(idx){
        return this.model.get(idx);
      }
    });

    return Teams;
  }
);
