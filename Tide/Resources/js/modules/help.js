define('help',[
  'app',
  'utils',
],function(app, utils){

    return help = {
      name:'help',
      model:null,
      bind_events:function(){
      
      },
      load_view:function(){
        var _this = this;
        var view = Backbone.View.extend({
          el: "#main-content",
          template: _.template($("#template-help").html()),
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
            'load':app.log('help view loaded')
          }
        });
        new view(); 
      },
      init:function(){
        var _this = this;
        utils.update_active('help');

        (document, 'load', function(help){

            _this.load_view();

        })(this);
      }
    }
  }
);
