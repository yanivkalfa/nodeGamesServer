/**
 * Created by yaniv-kalfa on 7/19/14.
 */
module.exports = function(_s){
    var serverDirname = _s.sServerDirname;
    return {
        "AjaxHandler" : serverDirname + '/lib/modules/AjaxHandler.js',
        "Authorization" : serverDirname + '/lib/modules/Authorization.js',
        "Games" : serverDirname + '/lib/modules/games.js',
        "GamesApi" : serverDirname + '/lib/modules/gamesApi.js',
        "oReq" : serverDirname + '/lib/requiredFiles.js',
        "oRouts" : serverDirname + '/lib/requiredRouts.js',
        "oWebSockets" : serverDirname + '/lib/requiredWebSockets.js',
        "QueuesApi" : serverDirname + '/lib/modules/queuesApi.js',
        "Servers" : serverDirname + '/lib/modules/servers.js',
        "User" : serverDirname + '/lib/modules/user.js',

        "games_Collection" : serverDirname + '/lib/games/supers/utilities/Collection.js',
        "games_List" : serverDirname + '/lib/games/supers/utilities/List.js',
        "games_Point" : serverDirname + '/lib/games/supers/utilities/Point.js',
        "games_Vector" : serverDirname + '/lib/games/supers/utilities/Vector.js',

        "games_Ai" : serverDirname + '/lib/games/supers/Ai.js',
        "games_Attributes" : serverDirname + '/lib/games/supers/Attributes.js',
        "games_Collision" : serverDirname + '/lib/games/supers/Collision.js',
        "games_Entity" : serverDirname + '/lib/games/supers/Entity.js',
        "games_Game" : serverDirname + '/lib/games/supers/Game.js',
        "games_InRouter" : serverDirname + '/lib/games/supers/InRouter.js',
        "games_KeyBinds" : serverDirname + '/lib/games/supers/KeyBinds.js',
        "games_Loader" : serverDirname + '/lib/games/supers/Loader.js',
        "games_Loop" : serverDirname + '/lib/games/supers/Loop.js',
        "games_Moves" : serverDirname + '/lib/games/supers/Moves.js',
        "games_OutRouter" : serverDirname + '/lib/games/supers/OutRouter.js',
        "games_Player" : serverDirname + '/lib/games/supers/Player.js',
        "games_Renderer" : serverDirname + '/lib/games/supers/Renderer.js',
        "games_Roles" : serverDirname + '/lib/games/supers/Roles.js',
        "games_ScoreBoard" : serverDirname + '/lib/games/supers/ScoreBoard.js',
        "games_SnapShot" : serverDirname + '/lib/games/supers/SnapShot.js',

        "games_PongAi" : serverDirname + '/lib/games/pong/PongAi.js',
        "games_PongAttributes" : serverDirname + '/lib/games/pong/PongAttributes.js',
        "games_PongBall" : serverDirname + '/lib/games/pong/PongBall.js',
        "games_PongBallCollision" : serverDirname + '/lib/games/pong/PongBallCollision.js',
        "games_PongCollision" : serverDirname + '/lib/games/pong/PongCollision.js',
        "games_PongEntity" : serverDirname + '/lib/games/pong/PongEntity.js',
        "games_PongGame" : serverDirname + '/lib/games/pong/PongGame.js',
        "games_PongInRouter" : serverDirname + '/lib/games/pong/PongInRouter.js',
        "games_PongKeyBinds" : serverDirname + '/lib/games/pong/PongKeyBinds.js',
        "games_PongLoop" : serverDirname + '/lib/games/pong/PongLoop.js',
        "games_PongMoves" : serverDirname + '/lib/games/pong/PongMoves.js',
        "games_PongOutRouter" : serverDirname + '/lib/games/pong/PongOutRouter.js',
        "games_PongPlayer" : serverDirname + '/lib/games/pong/PongPlayer.js',
        "games_PongRoles" : serverDirname + '/lib/games/pong/PongRoles.js',
        "games_PongScoreBoard" : serverDirname + '/lib/games/pong/PongScoreBoard.js',
        "games_PongSnapShot" : serverDirname + '/lib/games/pong/PongSnapShot.js'






    };
};