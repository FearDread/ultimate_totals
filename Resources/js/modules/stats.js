define('stats',[
  'app',
  'utils',
],function(app, utils){

    return stats = {
      name:'stats',
      model:null,
      data:{},
      stats_menu:function(){
      
      },
      load_stats:function(){
        this.model = app.get_stats();

      },
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
            var obj = _this.load_stats();
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
