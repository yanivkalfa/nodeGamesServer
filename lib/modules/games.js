module.exports = function(_s){
    var _ = _s.oReq.lodash
        , pathsList = _s.oConfig.pathsList
        , gameList = _s.oConfig.gameList
        , List = require(pathsList.games_List)(_s)
        ;
    function Games(){
        List.apply(this,arguments);
    }

    Games.prototype = Object.create(List.prototype);
    Games.prototype.constructor = Games;

    Games.prototype.createNewGame = function(gameDetails){
        var gOptions = {
                id : this.createUniqueId(),
                canvas : {
                    width : 900,
                    height : 500
                },
                name : gameDetails.name,
                type : gameDetails.name,
                room : gameDetails.room,
                expectingPlayers : gameDetails.expectingPlayers
            }
            ,Game, game, gType = gameList[gameDetails.name];

        if(!gType) return false;
        Game = require(pathsList[gType])(_s);
        game = new Game(gOptions);
        game.init();
        game.timers.killGame = setTimeout(function(){
            game.checkPlayers(true);
            clearTimeout(game.timers.killGame);
        }, 180000);
        this.add(game);
        return game.getDetails();
    };

    Games.prototype.join = function(gameId, p){
        var game;
        game = this.get(gameId);
        game.join(p);
    };


    return Games;
};



