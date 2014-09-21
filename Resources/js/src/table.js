/*--------------------------------*
 * @title: Table module 
 * @author: Garrett Haptonstall
*---------------------------------*/
define('table',[
  'utils',
  'sorter',
  'teams'
],function(utils, sorter, Teams){

    return table = {
      headers:[
        'team',
        'pflt',
        'palt',
        'hpat',
        'hpft',
        'apat',
        'apft',
        'avg'
      ],
      sort:{
        debug:true,
        sortList:[]
      },
      refresh_headers:function(){
        var thead = $('thead');
        var tr = $('<tr></tr>');

        $.each(this.headers, function(k, v){
          var th = $('<th></th>');
          th.append(utils.toUpper(v)); 
          tr.append(th);
        });

        thead.append(tr);
      },
      clear:function(){
        $('thead').empty();
        $('tbody').empty();
      },
      append_row:function(team){
        var html = '';
        var model = team.get('model');
        html += '<tr><td>' + team.get('name'); 

        $.each(model, function(k, v){
          if(v != 'avg'){
            if(typeof model[k] == undefined){
              model[k] = 0; 
            }
            html += '<td>' + model[k] + '</td>'; 
          }else{
            html += '<td>' + model.total + '</td>';
          }
        });
      
        html += '</tr>';
        $('tbody').append(html);
      },
      build_row:function(team, model){
        $('thead').empty();
        $('tbody').empty();

        this.refresh_headers();
        var html = '<tr><td>' + team; 

        $.each(this.headers, function(k, v){
          if(v != 'total'){
            html += '<td>' + 0 + '</td>'; 
          }else{
            html += '<td>' + model.total + '</td>';
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
        var _this = this;
      
        (document, 'load', function(table){

            _this.refresh_headers();

        })(this);

      }
    }
  }
);
