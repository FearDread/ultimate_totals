define('stats',[
  'jquery',
  'app',
  'utils',
  'stats_view'
],function($, app, utils, stats_view){

    return stats = {
      name:'stats',
      model:null,
      bind_events:function(){
      
      },
      load_view:function(){
        var _this = this;
        var view = Backbone.View.extend({
          el: "#main-content",
          template: _.template($("#template-stats").html()),
          initialize:function(){
            this.render();
          },
          render:function(){
            var obj = {};
            var html = this.template(obj);

            this.$el.html(html);
            _this.bind_events();

            return this;
          },
          events:{
            'load':app.log('news view loaded')
          }
        });
        new view(); 
      },
      init:function(){
        var _this = this;
        utils.update_active('stats');

        (document, 'load', function(stats){

            _this.load_view();

        })(this);
      }
    }
  }
);
