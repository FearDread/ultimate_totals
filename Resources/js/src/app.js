/*--------------------------------*
 * @title: Ultimate Totals 
 * @author: Garrett Haptonstall
*---------------------------------*/
define('app',[
  'router',
  'team',
  'teams',
  'utils',
  'game',
  'games',
],function(Router, Team, Teams, utils){

    return app = {
      debug:true,
      season:null,
      summary:null,
      schedule:null,
      injuries:null,
      rankings:null,
      standings:null,
      properties:null,
      ls:localStorage,
      fs:Ti.Filesystem,
      path:Ti.API.application.dataPath,
      window:Ti.UI.currentWindow,
      loader:{
        start:function(){
          $('div.fade').show();
        },
        stop:function(){
          $('div.fade').hide();
        }
      },
      log:function(message){
        if(this.debug){
          console.log('DEBUG: ', message);
        }
      },
      get_data:function(prop){
        this.loader.start();
        var sd = new sdata();
        var func = 'get_' + prop;

        if(this[prop] == null){
          this[prop] = sd[func]();
        }

        return this[prop];
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
      update_active:function(page){
        $('.main-nav ul li').removeClass('active');
        $('.main-nav ul li.' + page).addClass('active');
      },
      calculate_scores:function(team){
        var f = app.properties.getString('formula');
        var eq = new EQ(); 

        eq.apply_formula(f,team);
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
            formula:'sanchez',
            nba_key:'395ykxy34yqan3txm5zaqv6u',
            nfl_key:'gws9ztcsw6qdbtbvu8kpnxdn'
          });
        }

        Router.init();
        
        (document, 'ready', function(app){

          _this.window.setTitle("ULTIMATE TOTALS");
          _this.load_module('totals');
 
        })(this);
      }
    }
  }
);
