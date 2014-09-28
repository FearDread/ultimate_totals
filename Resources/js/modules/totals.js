define('totals',[
  'app',
  'team',
  'game',
  'games'
],function(app, Team, Game, Games){

    return totals = {
      name:'totals',
      model:null,
      bind_events:function(){
        var _this = this;

        $('.save-game').bind('click', function(_e){
          _e.preventDefault();
          _this.prep_game_data();
        });

        $('.totals').bind('click', function(_e){
          _e.preventDefault();

        });

        $('.sides').bind('click', function(_e){
          _.preventDefault();
        
        });
      },
      append_score:function(_e){
        _e.stopPropagation();
        var target = $(_e.target);
        var container = target.closest('div.team-game');

        if(target.hasClass('add-score')){
          _e.preventDefault();
          var f = $('.bottom', container); 
          var input = '<input type="text" name="score" placeholder="Score" />';
          f.prepend(input);
        }
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

        this.add_game(game);
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
        for(var i = 0; i < head.length; i++){
          var row = head[i];
          tr += '<th>' + row[1] + '</th>';
        }

        tr += '</tr>';
        $('thead').append(tr);
      
        do {
          var html = '<tr>';

          for(var x = 0; x < head.length; x++){
            var obj = head[x];
            html += '<td>' + rows.fieldByName(obj[0]) + '</td>';
          
          }

          html += '</tr>';
          $('tbody').append(html);
        
        } while(rows.isValidRow());
      },
      add_game:function(){
      
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
            _this.bind_events();

            return this;
          },
          events:{
            "ready":_this.add_all_games()
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
