define('database',[
  'app',
],function(app){

    return database = {
      name:'database',
      model:null,
      bind_events:function(){
      
      },
      load_view:function(){
        var _this = this;
        var view = Backbone.View.extend({
          el: "#main-content",
          template: _.template($("#template-db").html()),
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
            'load':app.log('database view loaded')
          }
        });

        new view();
      }, 
      init:function(){
        var _this = this;
        app.update_active('db');

        (document, 'ready', function(database){

            _this.load_view();
        
        })(this);
      }
    }
  }
);
