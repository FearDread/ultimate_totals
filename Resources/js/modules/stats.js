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
              _this.load_schedule();
              break;
          }
        });
      },
      load_ranks:function(){
        var _this = this,
            tbl = $('.ranks-tbl'),
            hkeys = ['Team','City','Division','Conference Rank','Division Rank'],
            okeys = ['name','market','alias','conference','division'];

        _this.add_header(tbl, hkeys);

        _this.model = app.get_data('rankings');
        _this.model.success(function(res){

          var json = $.xml2json(res);
          app.ls['ranks'] = JSON.stringify(json);

          _this.parse_data(json, tbl, okeys);

        }).error(function(err){
            if(app.ls['ranks']){

              var obj = JSON.parse(app.ls['ranks']);
              _this.parse_data(obj, tbl, okeys);

            }else{
              alert(err.status + ' Unable to get ranks.');
            }
        });
      },
      load_stats:function(){
        var _this = this,
            tbl = $('.standings-tbl'),
            hkeys = ['Team','City','Point Diff','Points For','Points Against','Wins','Losses','Win %'],
            okeys = ['name','market','point_diff','points_for','points_against','wins','losses','win_pct'];

        _this.add_header(tbl, hkeys);

        _this.model = app.get_data('standings');
        _this.model.success(function(res){

          var json = $.xml2json(res);
          app.ls['standings'] = JSON.stringify(json);

          _this.parse_data(json, tbl, okeys);

        }).error(function(err){
            if(app.ls['standings']){
          
              var obj = JSON.parse(app.ls['standings']);
              _this.parse_data(obj, tbl, okeys);
            
            }else{
              alert(err.status + ' Unable to get standings.');
            }
        });
      },
      load_schedule:function(){
        var _this = this,
            tbl = $('.schedule-tbl'),
            hkeys = ['Date','Home Team','Away Team','Venue','Status','Coverage'],
            okeys = ['scheduled','home','away','venue','status','coverage'];
      
        _this.add_header(tbl, hkeys);
        /* only need 2014 schedule once for now */
        if(app.ls['schedule']){

          var obj = JSON.parse(app.ls['schedule']);
          _this.parse_schedule(obj, tbl, okeys);

          return;
        }

        _this.model = app.get_data('schedule');
        _this.model.success(function(res){
          
          var json = $.xml2json(res);
          app.ls['schedule'] = JSON.stringify(json);

          _this.parse_schedule(json, tbl, okeys);
        
        }).error(function(err){
            if(app.ls['schedule']){

              var obj = JSON.parse(app.ls['schedule']);
              _this.parse_schedule(obj, tbl, okeys);
            
            }else{
              alert(err.status + ' Unable to get schedule');
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
      add_row:function(tbl, obj, keys){
        var tbody = $('tbody',tbl);
        var tr = '<tr>';
        var len = keys.length;
        var i = 0;

        do {
          
          if(obj.hasOwnProperty(keys[i])){
          
            if(typeof obj[keys[i]] == 'string'){
              tr += '<td>' + obj[keys[i]] + '</td>';
            }
          }
        
          i++;
        } while(--len);

        tr += '</tr>';
        tbody.append(tr);
      },
      parse_schedule:function(obj, tbl, keys){
        app.log(obj);
      
      },
      parse_data:function(obj, tbl, keys){
        var _this = this;

        if(obj != undefined){
          $('tbody', tbl).empty();

          var season = obj.season;
          var conf = season.conference;
          var i = 0;
          var len = conf.length;

          do {

            if(conf[i].division){
              var x = 0;
              var div = conf[i].division.length;

              do {
                
                var teams = [];
                if(conf[i].division[x].team){
                  teams = conf[i].division[x].team;
                }

                if(teams.length > 0){
                
                  for(var y = 0; y < teams.length; y++){
                    var team = teams[y];
                    team.alias = conf[i].division[x].name;

                    if(team.rank){
                      team.conference = team.rank.conference;
                      team.division = team.rank.division;
                    }

                    _this.add_row(tbl, team, keys);
                  }
                }

                x++;
              } while(--div);
            }
          
            i++;
          } while(--len);
          tbl.tablesorter();
        }
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
