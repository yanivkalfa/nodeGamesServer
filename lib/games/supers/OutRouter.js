module.exports = function(_s){


    /**
     *
     * @param {Game} game
     *
     * @api public
     */
    function OutRouter(game){

        /**
         * Holds ref to game object
         *
         * @type {Game}
         * @api public
         */
        this.game = game || {};
    }

    return OutRouter;
};