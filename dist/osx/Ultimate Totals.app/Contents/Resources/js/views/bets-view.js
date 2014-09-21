define('bets_view',[
  'jquery',
  'underscore',
  'app',
  'backbone'
],function($, _, app, Backbone){
  
    return Backbone.View.extend({
      el: "#main-content",
      template: _.template($("#template-bets").html()),
      initialize:function(){
        this.render();
      },
      render:function(){
        var obj = {};
        var html = this.template(obj);

        this.$el.html(html);

        return this;
      },
      events:{
        'load':app.log('bets view loaded')
      }
    });
  }
);
