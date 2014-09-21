define('news',[
  'jquery',
  'app',
  'utils',
  'news_view'
],function($, app, utils, news_view){

    return news = {
      run:function(){
        app.log('.. run() method called ..'); 
      }, 
      init:function(){
        utils.update_active('news');

        (document, 'load', function(news){

          new news_view();
          app.log('... news() module loaded ...'); 

        })(this);
      }
    }
  }
);
