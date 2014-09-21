define('totals_view',[
  'jquery',
  'underscore',
  'app',
  'backbone'
],function($, _, app, Backbone){

    return Backbone.View.extend({
      el: "#main-content",
      template: _.template($("#template-totals").html()),
      initialize:function(){
        var that = this;
        that.render();
      },
      render:function(){
        var obj = {};
        var html = this.template(obj);

        this.$el.html(html);
        this.build_select();

        return this;
      },
      events:{
        "ready":app.log('totals view loaded'),
      },
      build_select:function(){
        var $sel = $('select.team-select');
        var teams = app.teams.list;
        var len = teams.length;

        $sel.empty();
        for(var i = 0; i < len; ++i){
          var team = teams[i]; 
          var opt = '<option value="' + team + '">' + team + '</option>';

          $sel.append(opt);
        }
      }
    });
  }
);
