define('betting',[
  'app',
  'utils',
  'bet',
  'bets'
],function(app, utils, Bet, Bets){

    return betting = {
      name:'bets',
      model:null,
      bind_events:function(){
        var _this = this;

        $('.add-bet').bind('click', function(_e){
          _e.preventDefault();
          _this.save_new_bet(); 
        });
      
      },
      add_all_bets:function(){
        ('thead').empty();
        ('tbody').empty();

        var bet = new Bet();
        var rows = bet.get_all_bets();
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
        $.each(head, function(k,th){
          tr += '<th>' + th + '</th>';
        });

        tr += '</tr>'; 
        $('thead').append(tr);

        do {
          var html = '<tr>';

          $.each(head, function(k,th){
            html += '<td>' + rows.fieldByName(k) + '</td>'; 
          });

          html += '</tr>';
          $('tbody').append(html);

          rows.next();
        } while(rows.isValidRow());
      },
      save_new_bet:function(){
        var i = 0,
            form = $('form.new-bet-form'),
            vals = form.serializeArray(),
            len = vals.length,
            bet = new Bet();

        do {
          var obj = vals[i]; 
          bet.set(obj.name, obj.value);
        
          i++;
        } while(--len);

        bet.save_bet();
        this.add_all_bets();
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
            var obj = {};
            var html = this.template(obj);

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
        utils.update_active('bets');

        (document, 'load', function(betting){

          _this.load_view();

        })(this);
      }
    }
  }
);
