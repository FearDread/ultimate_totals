/*--------------------------------*
 * @title: Ultimate Totals 
 * @author: Garrett Haptonstall
 * @desc: Application for easy
 * calculations of basketball totals
*---------------------------------*/
define('app',[
  'router',
  'team',
  'teams',
  'utils',
  'table'
],function(Router, Team, Teams, utils, table){

    return app = {
      debug:true,
      properties:{},
      ls:localStorage,
      fs:Ti.Filesystem,
      window:Ti.UI.currentWindow,
      log:function(message){
        if(this.debug){
          console.log('DEBUG: ', message);
        }
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
      calculate_scores:function(team){
        var pflt, hpft, apft, palt, hpat, apat, apflt, apalt;
        var x = 0,
            total = 0,
            scores = team.get('scores'),
            len = scores.length,
            model = team.get('model');

        do {
          var s = scores[x];

          if(s == '') s = 0;
          total += parseInt(s, 10);

          if(x == 1){
            pflt = Math.floor(total / 2); 
            hpft = Math.floor((total - 10) / 2);
            apft = Math.floor((total + 10) / 2);
          }else if(x == 3){
            palt = Math.floor(total / 4); 
            hpat = Math.floor((total + 10) / 4);
            apat = Math.floor((total - 10) / 4);
          }

          x++;
        } while(--len);

        total = Math.floor(total / x);
        apflt = (pflt + hpft + apft) / 3;
        average = Math.floor((apflt + total) / 2);

        if(typeof palt !== undefined){
          apalt = (palt + hpat + apat) / 3;
          average = Math.floor((apflt + apalt) / 2);
        }

        model.pflt = pflt;
        model.palt = palt;
        model.hpft = hpft;
        model.apft = apft;
        model.hpat = hpat;
        model.apat = apat;
        model.total = average;

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
        if(this.debug){
          app.window.showInspector(); 
        }

        (document, 'ready', function(app){
          _this.window.setTitle("ULTIMATE TOTALS");
          _this.load_module('totals');

          $('.main-nav ul li').bind('click', function(_e){
            var name = $(this).children('a').attr('href'); 
            name = name.split('#')[1];

            _this.load_module(name); 
          });
        
        })(this);
      }
    }
  }
);
