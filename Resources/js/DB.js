define(['DB'], function(){
  /* Wrapper for Ti.Database */
  var DB = {
    name:'loacl_db',
    db:Ti.Database.open(this.name),
    create:function(){
      var tables = [
        "CREATE TABLE IF NOT EXISTS Bets(id INTEGER,type TEXT,pick TEXT,date DATE,comment TEXT, market TEXT, stakes TEXT, odds INTEGER,result TEXT, payout INTEGER);",
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
    }
  }

  return DB;

});
