define('betting',[
  'app',
  'bet',
  'bets',
  'libs/jquery/jquery-ui.min'
],function(app, Bet, Bets){

    return betting = {
      name:'bets',
      model:new Bet(),
      bind_events:function(){
        var _this = this;

        $('.add-bet').bind('click', function(_e){
          _e.preventDefault();
          _this.save_new_bet(); 
        });

        $('.datepicker').datepicker();
      },
      add_all_bets:function(){
        var tbl = $('.bets-table');
        $('thead', tbl).empty();
        $('tbody', tbl).empty();

        var rows = this.model.get_all_bets();
        var head = {
         'type':'Type',
         'pick':'Pick',
         'date':'Date',
         'comment':'Comment',
         'market':'Market',
         'stakes':'Stakes',
         'odds':'Odds',
         'result':'Result',
         'payout':'Payout'
        };
        var tr = '<tr>';

        for(var k in head){
          if(head.hasOwnProperty(k)){
            tr += '<th>' + head[k] + '</th>';
          }
        }
        tr += '</tr>'; 
        $('thead', tbl).append(tr);

        if(rows.rowCount() > 0){

          do {
            var html = '<tr data-idx="' + rows.fieldByName('id') + '">';

            for(var k in head){
              if(head.hasOwnProperty(k)){
                html += '<td class="' + k + '">' + rows.fieldByName(k) + '</td>'; 
              }
            }
            html += '</tr>';
            $('tbody', tbl).append(html);

            rows.next();
          } while(rows.isValidRow());
        }

        tbl.bind('click', function(_e){
          _e.stopPropagation();
          var target = $(_e.target);

          if(target.hasClass('result')){
            var tr = target.closest('tr');
            var id = tr.attr('data-idx');

            app.log(id);
          }
        });
      },
      save_new_bet:function(){
        var i = 0,
            form = $('form.new-bet-form'),
            vals = form.serializeArray(),
            len = vals.length;

        do {
          var obj = vals[i]; 
          this.model.set(obj.name, obj.value);
        
          i++;
        } while(--len);

        var res = this.model.save_bet();
        if(res){
          this.add_all_bets();
        }
      },
      load_view:function(){
        var _this = this;
        var view = Backbone.View.extend({
          el: "#main-content",
          template: _.template($("#template-bets").html()),
          initialize:function(){
            this.render();
          },
          render:function(){
            var html = this.template();
            this.$el.html(html);

            _this.bind_events();
            _this.add_all_bets();

            return this;
          },
          events:{
            'load':app.log('bets view loaded')
          }
        });

        new view(); 
      },
      init:function(){
        var _this = this;
        app.update_active('bets');

        (document, 'load', function(betting){

          _this.load_view();

        })(this);
      }
    }
  }
);
