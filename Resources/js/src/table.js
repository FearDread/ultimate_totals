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
        'Team',
        'Points For',
        'Points Against',
        'Home For',
        'Home Against',
        'Away For',
        'Away Against',
        'Average'
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
          if(v != 'total'){
            if(model[k] == null){
              model[k] = 'Not enough games.'; 
            }
            html += '<td>' + model[k] + '</td>'; 
          }else{
            html += '<td>' + model.total + '</td>';
          }
        });
      
        html += '</tr>';
        $('tbody').append(html);
      },
      build_table:function(teams){
        this.clear();
        this.refresh_headers();

        var i = 0;
        var len = teams.models.length;

        do {
          var team = teams.models[i];
          this.append_row(team);
        
          i++;
        } while(--len);
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
