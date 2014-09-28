define(['DB'], function(){
  /* Wrapper for Ti.Database */
  var DB = {
    db:Ti.Database.openFile(
      Ti.Filesystem.getFile(
        Ti.Filesystem.getApplicationDataDirectory(), 'ut_dev.db')),
    create:function(){
      var tables = [
        "create table if not exists Bets(id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT,pick TEXT,date TEXT,comment TEXT, market TEXT, stakes TEXT, odds TEXT,result TEXT, payout TEXT);",
        "create table if not exists Games(id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT,home TEXT,away TEXT,home_score INTEGER,away_score INTEGER,total INTEGER);"
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
