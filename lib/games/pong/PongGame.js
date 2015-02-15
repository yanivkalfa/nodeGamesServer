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
            console.log('both players');
            clearTimeout(this.timeout);
            this.outRouter.gs();
            this.timeout = setTimeout(function(){
                player.inRouter.init();
                self.start();
            }, 20000);
        }
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

        //console.log();

        console.log(self.mainLoop.get);
        console.log(self.mainLoop.prototype);
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
     * killing game
     *
     * @override
     * @api public
     */
    PongGame.prototype.kill = function(){
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