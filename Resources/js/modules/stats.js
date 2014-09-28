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
        this.model = app.get_data('standings');
        this.model.success(function(res){
          var json = $.xml2json(res);

          if(json != undefined){
            var name = json.name,
                season = json.season,
                conf = season.conference;

            var i = 0;
            var len = conf.length;

            do {

              if(conf[i].division){
                var x = 0;
                var div = conf[i].division.length;

                do {
                  var teams = conf[i].division[x].team;

                  for(var y = 0; y < teams.length; y++){
                    var team = teams[y];

                    console.log(team);
                  }
                
                  x++
                } while(--div);
              }
            
              i++;
            } while(--len);
          }
        });
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
            _this.load_stats();

            return this;
          },
          events:{
            'load':app.log('stats view loaded')
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
