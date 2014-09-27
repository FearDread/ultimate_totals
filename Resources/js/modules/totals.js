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
          _this.save_game_data(); 
        });

        $('.show-totals').bind('click', function(_e){

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
      save_game_data:function(){
      
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
      prep_calc_data:function(){
        var data = {};
        var hf = $('form.home-form');
        var af = $('form.away-form');

        data.home = hf.serializeArray();
        data.home['team'] = $('select.team-select', hf).val();
        data.home['handycap'] = $('select.handycap', hf).val();

        data.away = af.serializeArray();
        data.away['team'] = $('select.team-select', af).val();
        data.away['handycap'] = $('select.handycap', af).val();

        if(data.home[0].value == ''){
          alert('You must fill out at least two scores for at least one team.');
          return; 
        }

        app.predict_totals(data);
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
            "ready":app.log('totals view loaded'),
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
