// Prototype returning formula object with 
// needed equations for prediction methods.
// This will be extended via formulas module
// to add new formula methods
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
      var pflt, hpft, apft, palt, hpat, apat, apflt, apalt;
      var x = 0,
          total = 0,
          scores = team.get('scores'),
          len = scores.length,
          handycap = parseInt(team.get('handycap')),
          model = team.get('model');

      do {
        var s = scores[x];

        if(s == '') s = 0;
        total += parseInt(s, 10);

        if(x == 1){
          pflt = Math.floor(total / 2); 
          hpft = Math.floor((total + handycap) / 2);
          apft = Math.floor((total - handycap) / 2);
        }else if(x == 2){
          palt = Math.floor(total / 3); 
          hpat = Math.floor((total + handycap) / 3);
          apat = Math.floor((total - handycap) / 3);
        }
        if(x == 3){
          pflt = Math.floor(total / 4);
          hpft = Math.floor((total + handycap) / 4);
          apft = Math.floor((total - handycap) / 4);
        }else if(x == 4){
          palt = Math.floor(total / 5); 
          hpat = Math.floor((total + handycap) / 5);
          apat = Math.floor((total - handycap) / 5);
        }

        x++;
      } while(--len);

      apflt = Math.floor((pflt + hpft + apft) / 3);
      total = Math.floor(total / x);
      average = Math.floor((apflt + total) / 2);

      if(palt !== undefined){
        apalt = (palt + hpat + apat) / 3;
        average = Math.floor((apflt + apalt + total) / 3);
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
    pythagorean:function(team){
      console.log('apply pythagorean formula');
      console.log(team);
    }
  }
}
