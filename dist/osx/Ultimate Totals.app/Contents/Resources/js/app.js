/*--------------------------------*
 * @title: Ultimate Totals 
 * @author: Garrett Haptonstall
 * @desc: Application for easy
 * calculations of basketball totals
*---------------------------------*/
define('app',
  ['jquery','utils','table'], 

  function($, utils, table){

    return app = {
      debug:true,
      document:$(document),
      window:Ti.UI.currentWindow,
      local_storage:localStorage,
      log:function(message){
        console.log('DEBUG: ', message);
        Ti.API.log(message);
      }, 
      load_module:function(module){
        return require([module]);
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
        build_select:function(){
          var $sel = $('select.team-select');
          var teams = app.teams.list;
          var len = teams.length;

          for(var i = 0; i < len; ++i){
            var team = teams[i]; 
            var opt = '<option value="' + team + '">' + team + '</option>';

            $sel.append(opt);
          }
        },
      },
      run:function(data){
        var count = 0;
        var $sel = $('select');
        var team = $sel.val();
        var total = utils.math.sum(data); 
        this.local_storage['single'] = data;

        $.each(data, function(k, obj){
          if(obj.value > 0){
            ++count; 
          } 
        });

        total = total / count;
        this.teams.model['total'] = Math.floor(total);

        table.build_row(data, this.teams.model);
      },
      run_all:function(data){
        var count = 0;
        var total = utils.math.sum(data);
        
        $.each(data, function(k, obj){
          if(obj.value > 0){
            ++count; 
          } 
        });

        total = total / count;
        this.teams.model['total'] = Math.floor(total);

        table.build_table(data, this.teams);
      },
      init:function(){
        if(this.debug){
          app.window.showInspector(); 

          app.log("init finished ...");
          utils.log("modules loaded ...");
        }

        (document, 'ready', function(app){

          app.window.setTitle("$$$ ULTIMATE TOTALS $$$");
          app.teams.build_select();

          $('.calculate').on('click', function(_e){
            _e.preventDefault();
          
            var form = $('form');
            var vals = form.serializeArray();

            app.run(vals);
          });

          $('.calc-all-teams').on('click', function(_e){
            _e.preventDefault();

            var $f = $('form');
            var vals = $f.serializeArray();

            app.run_all(vals);
          });
        
        })(this);
      }
    }
  }
);
