/*--------------------------------*
 * @title: Utilities module 
 * @author: Garrett Haptonstall
*---------------------------------*/
define(['utils'], 
  function(utils){

    return utils = {
      log:function(message){
        console.log('UTILS: ', message); 
      },
      toUpper:function(str){
        if(typeof str == 'string'){
          return str.toUpperCase();
        }
      },
      math:{
        opts:[],
        ints:[],
        sum:function(data){
          var t = 0;

          $.each(data, function(key, val){
            var v = $.trim(val.value);
            if(v){
              t += parseInt(v, 10); 
            }
          });
          
          return t;
        },
        average:function(data){
          var t = 0;
          var a = 0;

          $.each(data, function(key, val){
            if(val != 0){
              ++a;
            }
            t += parseInt(val.value, 10);
          });

          var avg = t / a;
          avg = Math.floor(avg);

          utils.log('average : ' + avg);
          return avg;
        }
      },
      parse_obj:function(Object){
      
      },
      get_keys:function(Object){
        var Array = []
        for(var k in Object){
          if(!Object.hasOwnProperty(k)){
            continue
          } 
          Array.push(k)
        }
        return Array;
      },
      scroll_top:function(to){
        var mark = to.offset();
        $('html, body').animate({scrollTop:mark.top - 50}, 'slow');
      },
      size:function(Object){
        var Number = 0, key;
        for(key in Object){
          if(Object.hasOwnProperty(key)){
            size++; 
          }
        }
        return Number; 
      }
    }
  }
);
