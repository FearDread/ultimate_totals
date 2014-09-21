/*--------------------------------*
 * @title: Table module 
 * @author: Garrett Haptonstall
*---------------------------------*/
define('table',[
  'jquery',
  'utils',
  'sorter'
],function($, utils, sorter){

    return table = {
      headers:[
        'pflt',
        'palt',
        'hpat',
        'hpft',
        'apat',
        'apft',
        'total'
      ],
      sort:{
        debug:true,
        sortList:[]
      },
      refresh_headers:function(){
        var thead = $('thead');
        var tr = $('<tr></tr>');
        tr.append('<th>TEAM</th>');

        $.each(this.headers, function(k, v){
          var th = $('<th></th>');
          th.append(utils.toUpper(v)); 
          tr.append(th);
        });

        thead.append(tr);
      },
      build_row:function(data, model){
        $('thead').empty();
        $('tbody').empty();
        this.refresh_headers();

        var $sel = $('select');
        var team = $sel.val() || ''; 
        var html = '<tr><td>' + team; 

        $.each(this.headers, function(k, v){
          if(v != 'total'){
            html += '<td>' + 0 + '</td>'; 
          }else{
            html += '<td>' + 0 + '</td>';
          }
        });
        
        html += '</tr>';
        $('tbody').append(html);
      },
      build_table:function(data, teams){
        $('thead').empty();
        $('tbody').empty();

        var count = 5;
        var html = '<tr>',
        this.refresh_headers();

        $.each(teams.list, function(k, team){
          html += '<td>' + team + '</td>';

          $.each(teams.model, function(k, v){
            html += '<td>' + v + '</td>'; 
          });

          html += '</tr>';
        });

        $('tbody').append(html);
      },
      init:function(){
      
        (document, 'load', function(table){

        })(this);

      }
    }
  }
);
