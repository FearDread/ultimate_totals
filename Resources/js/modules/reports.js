define('reports',[
  'app',
  'utils',
  'router'
],function(app, utils, Router){

    return reports = {
      name:'reports',
      model:null,
      bind_events:function(){
      
      },
      load_view:function(){
        var _this = this;
        var view = Backbone.View.extend({
          el: "#main-content",
          template: _.template($("#template-reports").html()),
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
            'load':app.log('reports view loaded')
          }
        });

        new view();
      }, 
      init:function(){
        var _this = this;
        utils.update_active('reports');

        (document, 'ready', function(reports){

            _this.load_view();
        
        })(this);
      }
    }
  }
);
