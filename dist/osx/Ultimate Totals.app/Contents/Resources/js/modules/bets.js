define('bets',[
  'jquery',
  'app',
  'utils',
  'backbone'
],function($, app, utils, Backbone){

    return bets = {
      name:'bets',
      model:null,
      bind_events:function(){
        var _this = this;

        $('.add-bet').bind('click', function(_e){
          _e.preventDefault();
          _this.save_new_bet(); 
        });
      
      },
      save_new_bet:function(){
        app.log('save to DB and append to table...');
      
      },
      load_view:function(){
        var _this = this;
        var view = Backbone.View.extend({
          el: "#main-content",
          template: _.template($("#template-bets").html()),
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
            'load':app.log('bets view loaded')
          }
        });

        new view(); 
      },
      init:function(){
        var _this = this;
        utils.update_active('bets');

        (document, 'load', function(bets){

          _this.load_view();

        })(this);
      }
    }
  }
);
