module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , Point = require(pathsList.games_Point)(_s)
        , PongEntity = require(pathsList.games_PongEntity)(_s)
        , PongKeyBinds = require(pathsList.games_PongKeyBinds)(_s)
        , PongAttributes = require(pathsList.games_PongAttributes)(_s)
        , PongMoves = require(pathsList.games_PongMoves)(_s)
        , PongCollision = require(pathsList.games_PongCollision)(_s)
        , PongInRouter = require(pathsList.games_PongInRouter)(_s)
        ;


    /**
     *
     * @param {Object} opts
     *  - `name` {String} Player name
     *  - `local` {Boolean} is local player or remote.
     *
     * @param {PongGame} game ref
     *
     * @extends PongEntity
     * @api public
     */
    function PongPlayer(opts, game){
        PongEntity.apply(this,arguments);


        /**
         * Holds player name.
         *
         * @type {String}
         * @api public
         */
        this.name = opts.name || undefined;


        /**
         * Holds player type
         *
         * @type {String}
         * @api public
         */
        this.type = opts.type || undefined;

        /**
         * Holds local
         *
         * @type {Boolean}
         * @api public
         */
        this.local = opts.local || undefined;


        /**
         * Holds position relative in canvas.
         *
         * @type {Point}
         * @api public
         */
        this.position = this.opts.position || new Point(20, (this.game.canvas.height/2) - 50);


        /**
         * Holds dimensions
         *
         * @type {Object}
         * @api public
         */
        this.dimensions = this.opts.dimensions || {
            width  : 20,
            height  : 100
        };


        /**
         * Holds control
         *
         * @type {PongKeyBinds}
         * @api public
         */
        this.keyBinds = new PongKeyBinds();


        /**
         * Holds attributes
         *
         * @type {PongAttributes}
         * @api public
         */
        this.attributes = new PongAttributes();


        /**
         * Holds moves
         *
         * @type {PongMoves}
         * @api public
         */
        this.moves = new PongMoves(this.game, this);


        /**
         * Holds collision
         *
         * @type {PongCollision}
         * @api public
         */
        this.collision = new PongCollision(this.game, this);

        /**
         * Holds keysPressed
         *
         * @type {Object}
         * @api public
         */
        this.keysPressed = {};

        /**
         * Holds spark
         *
         * @type {spark}
         * @api public
         */
        this.spark = this.opts.spark || {};

        /**
         * Holds inRouter
         *
         * @type {PongInRouter}
         * @api public
         */
        this.inRouter = new PongInRouter(this.game, this);
    }

    PongPlayer.prototype = Object.create(PongEntity.prototype);
    PongPlayer.prototype.constructor = PongPlayer;


    /**
     * set key pressed
     *
     * @api public
     */
    PongPlayer.prototype.setKeyPress = function(msg){
        this.keysPressed = msg;
    };


    /**
     * move player
     *
     * @override
     * @api public
     */
    PongPlayer.prototype.move = function(){
        var keyBinds = this.keyBinds.get()
            , i, l, m
            ;

        i = 0;
        l = keyBinds.length;

        for(i;i<l;i++){
            m = keyBinds[i](this);
            this.moves[m] && this.moves[m]();
        }
    };

    return PongPlayer;
};