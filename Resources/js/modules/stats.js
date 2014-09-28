define('stats',[
  'app',
  'libs/jquery/jquery-ui.min',
  'libs/jquery/plugins/jquery.tablesorter.min',
  'libs/jquery/plugins/jquery.xmltojson'
],function(app){

    return stats = {
      name:'stats',
      model:null,
      bind_events:function(){
        var _this = this;

        $('#tabs').tabs();
        $('#tabs').bind('tabsshow', function(_e, ui){

          switch(ui.index){
            case 0:
              _this.load_stats();
              break;
            case 1:
              _this.load_ranks();
              break;
            case 2:
              _this.load_season();
              break;
            case 3:
              _this.load_schedual();
              break;
          }
        });

      },
      load_stats:function(){
        var _this = this,
            tbl = $('.standings-tbl'),
            keys = ['Team','City','Point Diff','Points For','Points Against','Wins','Losses','Win %'];

        _this.add_header(tbl, keys);

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
            tbl.tablesorter();
          }
        });
      },
      add_header:function(tbl, keys){
        var i = 0,
            tr = '<tr>',
            len = keys.length;

        $('thead', tbl).empty();

        do {
          tr += '<th>' + keys[i] + '</th>';
        
          i++;
        } while(--len);

        tr += '</tr>';
        $('thead', tbl).append(tr);
      },
      add_row:function(team){
        var tbl = $('.standings-tbl'),
            keys = ['name','market','point_diff','points_for','points_against','wins','losses','win_pct'],
            tbody = $('tbody',tbl);

        var tr = '<tr>';
        for(var obj in team){

          if(keys.indexOf(obj) > -1){

            if(typeof team[obj] == 'string'){
              tr += '<td>' + team[obj] + '</td>';
            }
          }
        }
        tr += '</tr>';
        tbody.append(tr);
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
