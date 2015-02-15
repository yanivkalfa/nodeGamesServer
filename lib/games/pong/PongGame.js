module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Game = require(pathsList.games_Game)(_s)
        , List = require(pathsList.games_List)(_s)
        , PongSnapShot = require(pathsList.games_PongSnapShot)(_s)
        , PongLoop = require(pathsList.games_PongLoop)(_s)
        , PongRoles = require(pathsList.games_PongRoles)(_s)
        , PongScoreBoard = require(pathsList.games_PongScoreBoard)(_s)
        , PongOutRouter = require(pathsList.games_PongOutRouter)(_s)
        , PongPlayer = require(pathsList.games_PongPlayer)(_s)
        , PongBall = require(pathsList.games_PongBall)(_s)
        , Point = require(pathsList.games_Point)(_s)
        , Vector = require(pathsList.games_Vector)(_s)
        , _ = _s.oReq.lodash
        ;

    /**
     *
     * @extends Game
     * @api public
     */
    function PongGame(opts){
        Game.apply(this, arguments);

        /**
         * Holds expectingPlayers
         *
         * @type {Object}
         * @api public
         */
        this.expectingPlayers = this.opts.expectingPlayers || {};


        /**
         * Holds snapshot
         *
         * @type {SnapShot}
         * @api public
         */
        this.snapShot = undefined;


        /**
         * Holds primus - socket
         *
         * @type {Primus}
         * @api public
         */
        this.primus = this.opts.primus || _s.primus;


        /**
         * room to transfer data
         *
         * @type {String}
         * @api public
         */
        this.room = this.opts.room || undefined;


        /**
         * Holds outRouter
         *
         * @type {PongOutRouter}
         * @api public
         */
        this.outRouter = undefined;


        /**
         * Holds offset Timer
         *
         * @type {Number}
         * @api public
         */
        this.offSetInterval = undefined;
    }

    PongGame.prototype = Object.create(Game.prototype);
    PongGame.prototype.constructor = PongGame;


    /**
     * Initiates all required classes
     *
     * @override
     * @api public
     */
    PongGame.prototype.init = function(){
        this.entities = new List();
        this.snapShot = new PongSnapShot(this, this.opts.snapShot || {});
        this.mainLoop = new PongLoop(this, this.opts.cycle || {});
        this.players = new List();
        this.roles = new PongRoles(this);
        this.outRouter = new PongOutRouter(this);
        this.scoreBoard = new PongScoreBoard(this);
    };


    /**
     * Join player to a game and check if all needed players joined
     *
     * @override
     * @api public
     */
    PongGame.prototype.join = function(p){
        if(!this.expectingPlayers[p.id]) return false;
        var players, self = this;
        players = this.players.get();

        p.local = (_.isEmpty(players));
        if(!p.local) p.position = new Point((self.canvas.width-40), (self.canvas.height/2) - 50);

        var player = new PongPlayer(p,this);
        this.addPlayer(player);
        if(this.checkPlayers()){
            this.outRouter.pr();
        }
    };


    /**
     * Join player to a game and check if all needed players joined
     *
     * @override
     * @api public
     */
    PongGame.prototype.prepareGame = function(){
        console.log('got prepareGame');
        var self = this;
        clearTimeout(this.timeout);
        this.outRouter.gs();
        this.startOffset();
        this.timeout = setTimeout(function(){
            self.startInRouts();
            self.start();
        }, 20000);
    };


    /**
     * starts in rout (accepting data)
     *
     * @api public
     */
    PongGame.prototype.startInRouts = function(){
        var self = this, players, pId;
        players = this.players.get();

        for(pId in players){
            if(!players.hasOwnProperty(pId)) continue;
            players[pId].inRouter.init();
        }
    };


    /**
     * OffsetTimer
     *
     * @api public
     */
    PongGame.prototype.startOffset = function(){
        var self = this;
        this.offSetInterval = setInterval(function(){
            self.outRouter.os();
        }, 500);
    };

    /**
     * OffsetTimer
     *
     * @api public
     */
    PongGame.prototype.stopOffset = function(){
        clearInterval( this.offSetInterval );
    };


    /**
     * Start game.
     *
     * @override
     * @api public
     */
    PongGame.prototype.start = function(){
        clearTimeout(this.timeout);
        var ball = new PongBall({id:'ball'},this), self = this;
        this.addEntity(ball);

        this.snapShot.start();
        self.scoreBoard.init();
        self.mainLoop.start();
        this.timeout = setTimeout(function(){
            ball.ai.start();
            clearTimeout(self.timeout);
        }, 1000);
    };


    /**
     * Get Game Details
     *
     * @api public
     */
    PongGame.prototype.getDetails = function(){
        var self = this;
        return {
            "id" : self.id,
            "room" : self.room,
            "entities" : self.entities.list,
            "requirePlayers" : self.requirePlayers,
            "expectingPlayers" : self.expectingPlayers
        }
    };


    /**
     * called after 3 minutes and check if players joined
     *
     * @api public
     */
    PongGame.prototype.checkPlayers = function(timedOut){
        var playerCount = this.players.length;
        if(playerCount != this.requirePlayers){
            if(timedOut){
                return this.kill();
            }
            return false;
        }else{
            return true;
        }
    };


    /**
     * On set primus/socket
     *
     * @api public
     */
    PongGame.prototype.setPrimus = function(primus){
        this.primus = primus;
    };


    /**
     * On set room
     *
     * @api public
     */
    PongGame.prototype.setRoom = function(room){
        this.room = room;
    };

    /**
     * Stopping game
     *
     * @api public
     */
    Game.prototype.stop = function(){
        this.snapShot.stop();
        this.mainLoop.stop();
        this.stopOffset();

    };


    /**
     * killing game
     *
     * @override
     * @api public
     */
    PongGame.prototype.kill = function(){
        console.log('i am killing you');
        this.unBindKey();
        this.stop();


        var players = this.players.get();
        for(var id in players){
            if(players.hasOwnProperty(id)) players[id].spark.end();
        }

        for(var prop in this){
            if(this.hasOwnProperty(prop)) delete this[prop];
        }
    };

    return PongGame;
};