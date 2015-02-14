module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , PongEntity = require(pathsList.games_PongEntity)(_s)
        , Point = require(pathsList.games_Point)(_s)
        , PongAi = require(pathsList.games_PongAi)(_s)
        , PongMoves = require(pathsList.games_PongMoves)(_s)
        , PongBallCollision = require(pathsList.games_PongBallCollision)(_s)
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
    function PongBall(opts, game){
        PongEntity.apply(this,arguments);


        /**
         * Holds position relative in canvas.
         *
         * @type {Point}
         * @api public
         */
        this.position = this.opts.position || new Point((this.game.canvas.width/2)-5, (this.game.canvas.height/2)-5);


        /**
         * Holds start position relative in canvas.
         *
         * @type {Point}
         * @api public
         */
        this.starPosition = this.opts.starPosition || new Point((this.game.canvas.width/2)-5, (this.game.canvas.height/2)-5);


        /**
         * Holds dimensions
         *
         * @type {Object}
         * @api public
         */
        this.dimensions = this.opts.dimensions || {
            width  : 10,
            height  : 10
        };


        /**
         * Holds background
         *
         * @type {String}
         * @api public
         */
        this.background = 'blue';


        /**
         * Holds collision
         *
         * @type {PongAi}
         * @api public
         */
        this.ai = new PongAi(this.game, this);


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
         * @type {PongBallCollision}
         * @api public
         */
        this.collision = new PongBallCollision(this.game, this);

    }

    PongBall.prototype = Object.create(PongEntity.prototype);
    PongBall.prototype.constructor = PongBall;


    /**
     * move player
     *
     * @override
     * @api public
     */
    PongBall.prototype.move = function(){
        if(this.moveDirection.x != 0 || this.moveDirection.y != 0) this.moves.moveVector(this.moveDirection);
    };

    return PongBall;
};