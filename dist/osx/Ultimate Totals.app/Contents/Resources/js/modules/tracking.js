define('tracking',[
  'jquery',
  'app',
  'utils',
], function($, app, utils){

    return tracking = {
  
      init:function(){

        (document, 'load', function(tracking){

          utils.log('... tracking() module loaded ...'); 

        })(this);
      }
    }
  }
);
