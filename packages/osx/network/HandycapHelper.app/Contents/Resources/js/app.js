/*--------------------------------*
 * @title: Handy Helper 
 * @author: Garrett Haptonstall
 * @description: Application for 
 * calculating point spreads in 
 * basketball 
*---------------------------------*/
define(['app'], function(app){

  return app = {
    
    debug:true,

    window:Ti.UI.currentWindow,

    document:$(document),

    properties:{
      'pflt':0,
      'palt':0,
      'hpft':0,
      'hpat':0,
      'apft':0,
      'total':0
    },

    log:function(message){
      console.log('DEBUG: ', message);
      Ti.API.log(message);
    }, 

    init_menu:function(){
      var menu = Ti.UI.createMenu();
      fileItem = Ti.UI.createMenuItem("File"),
      exitItem = fileItem.addItem('Exit', function(){
        if(confirm("Are you sure?")) {
          Ti.App.exit();
        }
      });

      menu.appendItem(fileItem);
      Ti.UI.setMenu(menu);

      app.log("init_menu finished ...");
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
      hash:{},
      build_select:function(){
        var $sel = $('select.team-select');
        var tms = app.teams.list;
        var len = tms.length;

        for(var i = 0; i < len; ++i){
          var team = tms[i]; 
          var opt = '<option value="' + team + '">' + team + '</option>';

          $sel.append(opt);
        }
      },
      build_hash:function(){
      
        this.hash = hash;
      }
    },

    table:{
      refresh_headers:function(){
        var thead = $('thead');
        var tr = $('<tr></tr>');
        tr.append('<th>TEAM</th>');

        $.each(app.properties, function(key, val){
          var th = $('<th></th>');

          th.append(key); 
          tr.append(th);
        });

        thead.append(tr);
      },

      build_table:function(data){
        $('thead').empty();
        $('tbody').empty();

        var html = '';
        app.table.refresh_headers();

        for(var i = 0; i < app.teams.list.length; ++i){
          var str = app.teams.list[i];
          html += '<tr>';
          html += '<td>' + str + '</td>'; 

          for(var x = 0; x < data.length; ++x){
            var obj = data[x];

            if(app.properties.hasOwnProperty(obj.name)){
              if(obj.value.length == 0){
                obj.value = '0'; 
              }
              html += '<td>' + obj.value + '</td>';      
            }else{
              html += '<td>' + app.properties['total'] + '</td>'; 
            } 
          }
          html += '</tr>';
        }

        $('tbody').append(html);
      }
    },

    calculate:function(data){
      var total = 0; 

      $.each(data, function(key, val){

        total = total + parseInt(val);
      });
      app.properties['total'] = parseInt(total / 10);
      app.table.build_table(data);
    },

    calculate_all:function(){
    
    },

    init:function(){
      if(app.debug){
        app.window.showInspector(); 
        app.log("init finished ...");
      }

      (document, 'ready', function(app){

        app.window.setTitle("$ HANDY HELPER $");

        app.teams.build_select();

        $('.submit-values').click(function(_e){
          _e.preventDefault();

          var $f = $('form');
          var vals = $f.serializeArray();

          app.calculate(vals);
        });
      
        // utils.log('working include');

      })(app);
    }
  }

});
// Equation variables //
// $pflt (Points overall last ten)
// $palt (Points against last ten)
// $hpft (home points for ten)
// $hpat (home points agains ten)
// $apft (away points for ten)
// $apat (point away points agains ten)
//
// Averages // 
// $avg_lto (average last ten overall)
// $avg_hpft_hpat (average home points for ten overall (home points againts ten overall ))
// $avg_apft_apat (away points for ten overall (away points against ten overall))
// $total (team total)
//
// Equation // 
// $avg_lto = ($pflt + $palt) / (2)
// $avg_hptf_hpat = ($hpft + $hpat) / (2)
// $avg_apft_apat = ($apft + $apat) / (2)
// $total = (avg_lto + $avg_hpft_hpat + $avg_apft_apat) / 3
//
// Game simulator // 
// take two teams and add totals from previous calculation
// show in comparison
// ===================================================================================== //
