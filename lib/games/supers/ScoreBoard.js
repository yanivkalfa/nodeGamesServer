module.exports = function(_s){

    var pathsList = _s.oConfig.pathsList
        , List
        ;

    List = require(pathsList.games_List)(_s);

    /**
     * Super scoreBoard
     *
     * @param {Game} game ref object
     * @api public
     */
    function ScoreBoard(game){

        /**
         * Holds ref to node element
         *
         * @type {List}
         * @api public
         */
        this.players = new List();


        /**
         * Holds ref to DOM node
         *
         * @type {Node}
         * @api public
         */
        this.node = undefined;


        /**
         * Holds ref to game object
         *
         * @type {Game}
         * @api public
         */
        this.game = game || {};


        /**
         * Holds need rendering
         *
         * @type {Boolean}
         * @api public
         */
        this.needRendering = false;
    }

    /**
     * initiates ScoreBoard
     *
     * @api public
     */
    ScoreBoard.prototype.init = function(){
        this.game.renderer.add(this);
        this.game.loader.add(this);
    };


    /**
     * Renders ScoreBoard
     *
     * @api public
     */
    ScoreBoard.prototype.render = function(){};


    /**
     * load ScoreBoard
     *
     * @api public
     */
    ScoreBoard.prototype.load = function(){
        this.game.loader.loaded(this);
    };

    return ScoreBoard;
};