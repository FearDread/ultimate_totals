define('formulas',[
  'app'
],function(app){

    return formulas = {
      name:'formulas',
      model:null,
      bind_events:function(){
      
      },
      load_view:function(){
        var _this = this;
        var view = Backbone.View.extend({
          el:"#main-content",
          template:_.template($('#template-formulas').html()),
          initialize:function(){
            this.render(); 
          },
          render:function(){
            var html = this.template();

            this.$el.html(html);
            _this.bind_events();

            return this;
          },
          events:{
            'load':app.log('formulas view loaded') 
          }
        });

        new view();
      },
      init:function(){
        var _this = this;
        app.update_active('formulas');

        (document, 'ready', function(formulas){

            _this.load_view();
        
        })(this);
      }
    }
  }
);
