module.exports = function(_s){


    /**
     *
     * @param {PongGame} game
     * @param {Entity} entity
     *
     * @api public
     */
    function InRouter(game, entity){

        /**
         * Holds ref to game object
         *
         * @type {PongGame}
         * @api public
         */
        this.game = game || {};


        /**
         * Holds entity
         *
         * @type {Entity}
         * @api public
         */
        this.entity = entity || {};
    }

    /**
     * Init inRouter
     *
     * @api public
     */
    InRouter.prototype.init = function(){};

    return InRouter;
};