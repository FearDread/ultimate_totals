define(['DB'], function(){
  /* Wrapper for Ti.Database */
  var DB = {
    name:'utotals_db',
    db:Ti.Database.open(this.name),
    create:function(){
      var tables = [
        "CREATE TABLE IF NOT EXISTS Bets(id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT,pick TEXT,date TEXT,comment TEXT, market TEXT, stakes TEXT, odds TEXT,result TEXT, payout TEXT);",
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
