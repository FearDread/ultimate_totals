define(['sdata'],function(){

    return sdata = {
      data:null,
      api:{
        nba:'395ykxy34yqan3txm5zaqv6u',
        nfl:'gws9ztcsw6qdbtbvu8kpnxdn'
      },
      urls:{
        game:'http(s)://api.sportsdatallc.org/nba-[access_level][version]/games/[game_id]/summary.xml?api_key=[your_api_key]',
        season:'http(s)://api.sportsdatallc.org/nba-[access_level][version]/seasontd/[season]/[nba_season]/teams/[team_id]/statistics.xml?api_key=[your_api_key]',
        ranks:'http(s)://api.sportsdatallc.org/nba-[access_level][version]/seasontd/[season]/[nba_season]/rankings.xml?api_key=[your_api_key]',
        standings:'https://api.sportsdatallc.org/nba-t3/seasontd/2013/reg/standings.xml?api_key=' + this.api[0],
        series:'http(s)://api.sportsdatallc.org/nba-[access_level][version]/series/[season]/[nba_season]/schedule.xml?api_key=[your_api_key]',
        schedual:'http(s)://api.sportsdatallc.org/nba-[access_level][version]/games/[season]/[nba_season]/schedule.xml?api_key=[your_api_key]'
      },
      get_season:function(){
      
      },
      get_scores:function(){

      },
      get_standings:function(){
        $.get(this.urls.standings, function(res){
          console.log(res);
          if(res !== undefined){
            console.log(res);
            return res;
          }
        });
      },
      get_rankings:function(){
      
      }
    }
  }
);
