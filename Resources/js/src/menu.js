define('menu',
  ['jquery','app'],

  function($, app){

    return menu = {
      items:{
        'File':{
          'Print':function(){
          
          },
          'Exit':function(){
            if(confirm("Are you sure?")) {
              Ti.App.exit();
            }
          }
        },
        'Formulas':{
          'Sanchez':function(){
          
          },
          'Pythagorean':function(){
          
          }
        }
      },
      init:function(){
        var menu = Ti.UI.createMenu();

        $.each(this.items, function(k, obj){
          item = Ti.UI.createMenuItem(k),

          $.each(obj, function(t, fn){
          
            sub = item.addItem(t, fn);
          });

          menu.appendItem(item);
        });

        Ti.UI.setMenu(menu);
      },
    }
  }
);
