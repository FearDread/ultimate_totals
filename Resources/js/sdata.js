/* Sports Data Object
 * @desc simple object that returns ajax promises with sdata xml
 */
var sdata = function(){
  return {
    urls:{
      ranks:'https://api.sportsdatallc.org/nba-t3/seasontd/2013/reg/rankings.xml?api_key=395ykxy34yqan3txm5zaqv6u',
      season:'https://api.sportsdatallc.org/nba-t3/seasontd/2013/reg/teams/[team_id]/statistics.xml?api_key=395ykxy34yqan3txm5zaqv6u',
      injuries:'https://api.sportsdatallc.org/nba-t3/league/injuries.xml?api_key=395ykxy34yqan3txm5zaqv6u',
      schedule:'https://api.sportsdatallc.org/nba-t3/games/2014/reg/schedule.xml?api_key=395ykxy34yqan3txm5zaqv6u',
      standings:'https://api.sportsdatallc.org/nba-t3/seasontd/2013/reg/standings.xml?api_key=395ykxy34yqan3txm5zaqv6u',
      game:'http://api.sportsdatallc.org/nba-[access_level][version]/games/[game_id]/summary.xml?api_key=[your_api_key]',
      series:'http(s)://api.sportsdatallc.org/nba-[access_level][version]/series/[season]/[nba_season]/schedule.xml?api_key=[your_api_key]'
    },
    set_cookie(name, time){
      $.cookie(name, 1,{
        expires:time,
      });
    },
    check_cookie(name){
      var val = $.cookie(name);

      if(val){
        return true;
      }else{
        return false;
      }
    },
    get_injuries:function(){
      return $.ajax({url:this.urls.injuries}); 
    },
    get_season:function(){
      return $.ajax({url:this.urls.season});
    },
    get_schedule:function(){
      return $.ajax({url:this.urls.schedule}); 
    },
    get_series:function(){
      return $.ajax({url:this.urls.series});
    },
    get_standings:function(){
      return $.ajax({url:this.urls.standings}); 
    },
    get_rankings:function(){
      return $.ajax({url:this.urls.ranks});
    }
  }
}
