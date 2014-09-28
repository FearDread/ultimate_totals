define('stats',[
  'app',
  'libs/jquery/jquery-ui.min',
  'libs/jquery/plugins/jquery.xmltojson'
],function(app){

    return stats = {
      name:'stats',
      model:null,
      bind_events:function(){

        $('#tabs').tabs();
        this.add_header();

      },
      load_stats:function(){
        var _this = this;

        _this.model = app.get_data('standings');
        _this.model.success(function(res){
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
                    _this.add_row(team);
                  }
                
                  x++
                } while(--div);
              }
            
              i++;
            } while(--len);
          }
        });
      },
      add_header:function(){
        var tbl = $('.standings-tbl'),
            keys = ['Team','City','Point Diff','Points For','Points Against','Wins','Losses','Win %'],
            i = 0,
            len = keys.length;

        var tr = '<tr>';

        do {
          console.log(keys[i]);
          tr += '<th>' + keys[i] + '</th>';
        
          i++;
        } while(--len);

        tr += '</tr>';
        $('thead', tbl).append(tr);
      },
      add_row:function(team){
        var tbl = $('.stats-table'),
            tbody = $('tbody',tbl);
            tbody.empty();

        console.log(team);
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
