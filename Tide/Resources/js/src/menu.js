define('menu',[
  'app'
],function(app){

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
        'Tools':{
          'Clear Storage':function(){
            if(confirm('You are about to clear all local storage, are you sure?')){
              app.ls.clear(); 
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
