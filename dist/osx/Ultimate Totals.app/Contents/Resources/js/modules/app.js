/*--------------------------------*
 * @title: Ultimate Totals 
 * @author: Garrett Haptonstall
 * @desc: Application for easy
 * calculations of basketball totals
*---------------------------------*/
define('app',[
  'jquery',
  'underscore',
  'utils',
  'table',
  'team',
  'teams'
],function($, _, utils, table, team, teams){

    return app = {
      debug:true,
      state:'totals',
      document:$(document),
      window:Ti.UI.currentWindow,
      local_storage:localStorage,
      log:function(message){
        console.log('DEBUG: ', message);
        Ti.API.log(message);
      }, 
      load_module:function(module){
        if(module == this.state){
          return this.refresh(); 
        }else{
          require([module], function(module){
            return module.init(); 
          });
        }
      },
      load_view:function(view){
        $('.main-content').unbind();
        require([view], function(view){
          return new view(); 
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
        model:{
          'pflt':0,
          'palt':0,
          'hpat':0,
          'hpft':0,
          'apat':0,
          'apft':0,
          'total':0
        },
      },
      run:function(data){
        var away = data.away;
        var home = data.home;
        var ht = new team({'name':home['team']});
        var at = new team({'name':away['team']});
        $.each(home, function(k, v){
          var t = home['type'];
          if(v.value != ''){
            switch(t){
              case 'all':
                ht.attributes.scores.push(parseInt(v.value, 10));    
                break;
              case 'away':
                ht.attributes.away_scores.push(parseInt(v.value, 10));
                break;
              case 'home':
                ht.attributes.home_scores.push(parseInt(v.value, 10));
                break;
            default:
              break;
            }
          } 
        });
        $.each(away, function(k, v){
          var t = away['type'];
          if(v.value != ''){
            switch(t){
              case 'all':
                at.attributes.scores.push(parseInt(v.value, 10));    
                break;
              case 'away':
                at.attributes.away_scores.push(parseInt(v.value, 10));
                break;
              case 'home':
                at.attributes.home_scores.push(parseInt(v.value, 10));
                break;
            default:
              break;
            }
          } 
        });
        
        app.log(at);
        app.log(ht);
        table.build_row(data, at);
      },
      run_all:function(data){
        app.log(data);
        var count = 0;
        var total = utils.math.sum(data);
        var ts = new teams();

        for(var x = 0; x < this.teams.list.length; ++x){
          var t = new team({'name':this.teams.list[x]});
          ts.push(t);
        }

        app.log(ts);
        table.build_table(data, this.teams);
      },
      refresh:function(){
        utils.update_active('totals');

        app.load_view('totals_view');
        app.log('... refresh totals view ...');
      },
      init:function(){
        if(this.debug){
          app.window.showInspector(); 
          app.log("... app.init() ...");
        }
        table.init();

        (document, 'ready', function(app){
          app.window.setTitle("$$$ ULTIMATE TOTALS $$$");
          app.load_view('totals_view');

          $('.main-nav ul li').on('click', function(_e){
            _e.preventDefault();
            var name = $(this).children('a').attr('href'); 
            name = name.split('#')[1];

            app.load_module(name); 
          });
        
        })(this);
      }
    }
  }
);
