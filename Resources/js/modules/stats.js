define('stats',[
  'app',
  'libs/jquery/plugins/jquery.xmltojson'
],function(app){

    return stats = {
      name:'stats',
      model:null,
      stats_menu:function(){
      
      },
      load_stats:function(){
        this.model = app.get_data();
        var json = $.xml2json(this.model);

        var season = json.season;
        var conf = season.conference;
            
        var i = 0;
        console.log(json);
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
            var html = this.template();

            this.$el.html(html);
            _this.bind_events();

            return this;
          },
          events:{
            'load':_this.load_stats()
          }
        });

        new view(); 
      },
      init:function(){
        var _this = this;
        app.update_active('stats');

        (document, 'load', function(stats){

            _this.load_view();

        })(this);
      }
    }
  }
);
