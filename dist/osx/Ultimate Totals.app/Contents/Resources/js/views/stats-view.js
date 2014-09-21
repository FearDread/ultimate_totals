define('stats_view',[
  'jquery',
  'underscore',
  'app',
  'backbone'
],function($, _, app, Backbone){
  
    return Backbone.View.extend({
      el: "#main-content",
      template: _.template($("#template-stats").html()),
      initialize:function(){
        this.render();
      },
      render:function(){
        var obj = {};
        var html = this.template(obj);

        this.$el.html(html);
        $('iframe').hide();
        $('iframe').load(function(){
          $(this).contents().find('table.main > tr:first-child').css('display','none'); 
          $(this).contents().find('table.main tr:nth-child(1)').css('display','none'); 
          $(this).contents().find('table.main tr:nth-child(2)').css('display','none'); 
          $(this).contents().find('table.main tr:nth-child(3)').css('display','none'); 
          $(this).show();
        });
        return this;
      },
      events:{
        'load':app.log('news view loaded')
      }
    });
  }
);
