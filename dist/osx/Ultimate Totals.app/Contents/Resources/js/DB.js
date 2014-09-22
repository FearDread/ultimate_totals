define(['DB'], function(){
  /* Wrapper for Ti.Database */
  var DB = {
    db:Ti.Database.openFile(
      Ti.Filesystem.getFile(
        Ti.Filesystem.getApplicationDataDirectory(), 'utotals.db')),
    create:function(){
      var tables = [
        "create table if not exists Bets(id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT,pick TEXT,date TEXT,comment TEXT, market TEXT, stakes TEXT, odds TEXT,result TEXT, payout TEXT);",
        "create table if not exists Games(id INTEGER PRIMARY KEY AUTOINCREMENT,team TEXT,pf TXT,pa TEXT,hf TEXT,ha TEXT,af TEXT,aa TEXT,average TEXT)"
      ];

      var i = 0;
      var len = tables.length;

      do {
        this.query(tables[i]);
      
        i++;
      } while(--len);
    },
    query:function(query){
      return this.db.execute(query); 
    },
    exit:function(){
      this.db.close(); 
    }
  }

  return DB;

});
