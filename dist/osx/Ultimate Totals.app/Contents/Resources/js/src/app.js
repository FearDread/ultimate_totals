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
      document:document,
      window:Ti.UI.currentWindow,
      debug:true,
      LS:localStorage,
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
        var x = 0,
            total = 0,
            scores = team.get('scores'),
            len = scores.length,
            model = team.get('model');

        do {
          var s = scores[x];
          total += parseInt(s, 10);

          if(x == 1){
            var pflt = Math.floor(total / 2); 
            var hpft = Math.floor((total - 10) / 2);
            var apft = Math.floor((total + 10) / 2);
          }else if(x == 3){
            var palt = Math.floor(total / 5); 
            var hpat = Math.floor((total + 10) / 4);
            var apat = Math.floor((total - 10) / 4);
          }

          x++;
        } while(--len);

        total = Math.floor(total / x);
        var apflt = (pflt + hpft + apft) / 3;
        average = Math.floor((apflt + total) / 2);

        model.pflt = pflt;
        model.palt = palt;
        model.hpft = hpft;
        model.apft = apft;
        model.hpat = hpat;
        model.total = average;

        app.log(team);
        table.append_row(team);
      },
      calculate_all:function(col){
      
      },
      run_totals:function(obj){
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
      run_all_totals:function(obj){
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
          teams.add(t);

          y++;
        } while(--tms);

        app.calculate_all(teams);
        table.build_table(obj, this.teams);
      },
      init:function(){
        var _this = this;
        if(this.debug){
          app.window.showInspector(); 
        }

        (document, 'ready', function(app){
          _this.window.setTitle("$$$ ULTIMATE TOTALS $$$");
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
