// jquery plugin returning formula object with 
// needed equations for prediction methods.
var EQ = function(){
  return {
    opts:{
      team:null,
      homeAway:'away',
      lastGame:'lost',
      injuries:0,
      handycap:0
    },
    apply_formula:function(formula, team){
      var _this = this;

      switch(formula){
        case 'sanchez':
          return _this.sanchez(team);
          break; 

        case 'pythagorean':
          return _this.pythagorean(team);
          break;

        default:
          break;
      }
    },
    sanchez:function(team){
      var pflt, hpft, apft, palt, hpat, apat, apflt, apalt, pfalt;
      var x = 0,
          total = 0,
          scores = team.get('scores'),
          len = scores.length,
          handycap = team.get('handycap');
          model = team.get('model');

      do {
        var s = scores[x];

        if(s == '') s = 0;
        total += parseInt(s, 10);

        if(x == 1){
          pflt = Math.floor(total / 2); 
          hpft = Math.floor((total - 10) / 2);
          apft = Math.floor((total + 10) / 2);
        }else if(x == 3){
          palt = Math.floor(total / 4); 
          hpat = Math.floor((total + 10) / 4);
          apat = Math.floor((total - 10) / 4);
        } else if (x > 4){
        
        }

        x++;
      } while(--len);


      apflt = (pflt + hpft + apft) / 3;
      if(typeof palt != undefined){
        pfalt = (palt + hpat + apat) / 3;
      
      }

      total = Math.floor(total / x);
      if(apflt){
      
      }
      average = Math.floor((apflt + total) / 2);

      if(typeof palt !== undefined){
        apalt = (palt + hpat + apat) / 3;
        average = Math.floor((apflt + apalt) / 2);
      }

      model.pflt = pflt || null;
      model.palt = palt || null;
      model.hpft = hpft || null;
      model.apft = apft || null;
      model.hpat = hpat || null;
      model.apat = apat || null;
      model.total = average;
    
      return team;
    },
    pythagorean:function(){
    
    }
  }
}
