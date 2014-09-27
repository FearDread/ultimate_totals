/*--------------------------------*
 * @title: Ultimate Totals 
 * @author: Garrett Haptonstall
 * @desc: Application for easy
 * calculations of sports totals
*---------------------------------*/
define('app',[
  'router',
  'team',
  'teams',
  'utils',
  'table',
  'sdata'
],function(Router, Team, Teams, utils, table, sdata){

    return app = {
      data:{},
      debug:true,
      properties:null,
      ls:localStorage,
      fs:Ti.Filesystem,
      path:Ti.API.application.dataPath,
      window:Ti.UI.currentWindow,
      log:function(message){
        if(this.debug){
          console.log('DEBUG: ', message);
        }
      },
      get_data:function(){
        return this.data;
      },
      load_module:function(module){
        require([module], function(module){
          return module.init(); 
        });
      },
      load_view:function(view){
        $('.main-content').unbind();
        require([view], function(view){
          return new view().render(); 
        });
      },
      load_season:function(){
        console.log('season data here');
        this.data = sdata.get_standings(); 
      },
      teams:{
        list:[
          'Dallas',
          'Sacramento',
          'Washington',
          'New York',
          'Atlanta',
          'Boston',
          'Brooklyn',
          'Charlote',
          'Chicago',
          'Clevland',
          'Denver',
          'Detroit',
          'Golden State',
          'Houston',
          'Indiana',
          'Las Angeles Clippers',
          'Las Angeles Lakers',
          'Memphis',
          'Miami',
          'Milwaukee',
          'Minnesota',
          'New Orleans',
          'New York Knicks',
          'Oaklahoma',
          'Orlando',
          'Philadelphia',
          'Phonix',
          'Portland',
          'San Antonio',
          'Toronto',
          'Utah',
          'Washington'
        ],
      },
      update_active:function(page){
        $('.main-nav ul li').removeClass('active');
        $('.main-nav ul li.' + page).addClass('active');
      },
      calculate_scores:function(team){
        var f = app.properties.getString('formula');
        var eq = new EQ(); 

        eq.apply_formula(f,team);
        table.append_row(team);
      },
      predict_totals:function(obj){
        var i = 0;
        var types = ['home', 'away'];
        var len = types.length;

        do {
          var type = types[i]; 
          var arr = obj[type];

          if(type == 'home'){
            var home_team = new Team();
            var new_scores = _.clone(home_team.get('scores'));

            home_team.set('name', obj[type].team);
            home_team.set('handycap', obj[type].handycap);

            for(var x = 0; x < arr.length; x++){
              var s = arr[x].value;

              if(parseInt(s, 10) > 0){
                new_scores.push(s);
              }
            }
            home_team.set('scores', new_scores);

          }else{
            var away_team = new Team();
            var new_scores = _.clone(away_team.get('scores'));

            away_team.set('name', obj[type].team);
            away_team.set('handycap', obj[type].handycap);

            for(var x = 0; x < arr.length; x++){
              var s = arr[x].value;
              
              if(parseInt(s, 10) > 0){
                new_scores.push(s);
              }
            }
            away_team.set('scores', new_scores);
          }

          i++;
        } while(--len);

        table.clear();
        table.refresh_headers();

        app.calculate_scores(home_team);
        if(away_team.get('scores').length > 0){
          app.calculate_scores(away_team);
        }
      },
      save_game:function(){
      
        alert("Game added to Database.");
      },
      predict_all_teams:function(obj){
        var y = 0;
        var teams = new Teams();
        var tms = this.teams.list.length;

        do {
          var t = new Team();
          var scores = _.clone(t.get('scores'));

          t.set('name', this.teams.list[y]);
          for(var x = 0; x < obj.length; x++){
            var s = obj[x].value;

            if(parseInt(s) > 0){
              scores.push(s);
            }
          }
          t.set('scores', scores);

          this.calculate_scores(t);
          teams.add(t);

          y++;
        } while(--tms);

        table.build_table(teams);
      },
      init:function(){
        var _this = this;
        var file = _this.fs.getFile(_this.path, 'user.properties');

        if(_this.debug){
          _this.window.showInspector(); 
        }

        if(file.exists()){
          _this.properties = Ti.App.loadProperties(file);
        }else{
          _this.properties = Ti.App.createProperties({
              formula:'sanchez'
          });
        }

        /* Initialize router */
        Router.init();

        // load data //
        _this.load_season();

        (document, 'ready', function(app){

          _this.window.setTitle("ULTIMATE TOTALS");
          _this.load_module('totals');
        
        })(this);
      }
    }
  }
);
