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
        var bets = new Bets();
        var all = bets.get_all_bets();

        app.log(bets);
        app.log(all);
      },
      save_new_bet:function(){
        var i = 0,
            form = $('form.new-bet-form'),
            vals = form.serializeArray(),
            bet = new Bet(),
            len = vals.length;

        do {
          var obj = vals[i]; 
          bet.set(obj.name, obj.value);
        
          i++;
        } while(--len);

        app.log(bet);
        bet.save_bet();
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
