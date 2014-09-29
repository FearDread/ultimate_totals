define('totals',[
  'app',
  'team',
  'game',
  'games',
  'libs/jquery/jquery-ui.min'
],function(app, Team, Game, Games){

    return totals = {
      name:'totals',
      model:null,
      bind_events:function(){
        var _this = this;
        app.loader.stop();

        $('.save-game').bind('click', function(_e){
          _e.preventDefault();
          _this.prep_game_data();
        });

        $('.calc-totals').bind('click', function(_e){
          _e.preventDefault();

        });

        $('.calc-sides').bind('click', function(_e){
          _.preventDefault();

        });

        $('.datepicker').datepicker();
      },
      prep_game_data:function(){
        var data = {};
        var hf = $('form.home-form');
        var af = $('form.away-form');
      
        data.home = {};
        data.away = {};
        data.date = $('input[name="game_date"]').val();

        data.home['team'] = $('select.team-select', hf).val();
        data.home['score'] = $('input[name="score"]', hf).val();

        data.away['team'] = $('select.team-select', af).val();
        data.away['score'] = $('input[name="score"]', af).val();

        hf[0].reset();
        af[0].reset();
        $('input[name="game_date"]').val('');

        this.save_game_data(data);
      },
      save_game_data:function(obj){
        var i = 0;
        var types = ['home', 'away'];
        var len = types.length;
        var game = new Game(); 

        game.set('date', obj.date);

        do {
          var type = types[i]; 
          var arr = obj[type];

          if(type == 'home'){
            var home_team = new Team();

            home_team.set('name', obj[type].team);
            home_team.set('score', parseInt(obj[type].score)); 

            game.set('home', home_team);

          }else{
            var away_team = new Team();

            away_team.set('name', obj[type].team);
            away_team.set('score', parseInt(obj[type].score));

            console.log(away_team);
            game.set('away', away_team);
          }

          i++;
        } while(--len);

        game.set('total', home_team.get('score') + away_team.get('score'));
        game.save_game();

        this.add_all_games();
      },
      add_all_games:function(){
        $('thead').empty();
        $('tbody').empty();

        var game = new Game();
        var rows = game.get_all_games();
        var head = {
          'date':'Date',
          'home':'Home Team',
          'home_score':'Home Score',
          'away':'Away Team',
          'away_score':'Away Score',
          'total':'Game Total'
        };
        var tr = '<tr>';

        for(var k in head){
          if(head.hasOwnProperty(k)){
            tr += '<th>' + head[k] + '</th';
          }
        }
        tr += '</tr>';
        $('thead').append(tr);
      
        if(rows.rowCount() > 0){

          do {
            var html = '<tr>';

            for(var k in head){
              if(head.hasOwnProperty(k)){
                html += '<td>' + rows.fieldByName(k) + '</td>';
              }
            }
            html += '</tr>';
            $('tbody').append(html);
          
            rows.next();
          } while(rows.isValidRow());
        }
      },
      build_select:function(){
        var i = 0,
            teams = app.teams.list,
            len = teams.length,
            $sel = $('select.team-select');
            $sel.empty();

        do {
          var team = teams[i]; 
          var opt = '<option value="' + team + '">' + team + '</option>';

          $sel.append(opt);
        
          i++;
        } while(--len);
      },
      load_view:function(){
        var _this = this;
        var view = Backbone.View.extend({
          el: "#main-content",
          template: _.template($("#template-totals").html()),
          initialize:function(){
            this.render();
          },
          render:function(){
            var html = this.template();
            this.$el.html(html);

            _this.build_select();
            _this.add_all_games();

            _this.bind_events();

            return this;
          },
          events:{
            'load':app.log('totals view loaded')
          },
        });

        new view();
      },
      init:function(){
        var _this = this;
        app.update_active('totals');

        (document, 'load', function(totals){

          _this.load_view();

        })(this);
      }
    }
  }
);
